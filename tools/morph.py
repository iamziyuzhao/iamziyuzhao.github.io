"""Delaunay triangle morph between two 480x480 images (numpy + scipy only)."""
import sys
import numpy as np
from PIL import Image
from scipy.spatial import Delaunay
from scipy.ndimage import map_coordinates

S = 480
# (wukong_xy, albert_xy) pairs, in 480px square coordinates
PAIRS = [
    # face
    ((240, 155), (240, 73)),   # head top
    ((240, 177), (238, 95)),   # forehead
    ((228, 218), (223, 128)),  # eye L
    ((252, 218), (252, 128)),  # eye R
    ((240, 223), (237, 142)),  # nose
    ((240, 237), (235, 157)),  # mouth
    ((240, 247), (235, 177)),  # chin
    ((213, 213), (207, 133)),  # cheek L
    ((265, 213), (268, 133)),  # cheek R
    ((200, 213), (193, 140)),  # ear L
    ((278, 213), (275, 140)),  # ear R
    ((218, 237), (215, 163)),  # jaw L
    ((262, 237), (260, 163)),  # jaw R
    # body
    ((240, 258), (236, 192)),  # neck
    ((165, 262), (130, 236)),  # shoulder L
    ((315, 262), (345, 232)),  # shoulder R
    ((240, 290), (236, 265)),  # chest
    ((156, 348), (126, 320)),  # elbow L
    ((324, 348), (350, 322)),  # elbow R
    ((240, 358), (236, 330)),  # hands
    ((114, 384), (156, 474)),  # knee L / hip L
    ((366, 384), (324, 474)),  # knee R / hip R
    ((240, 404), (240, 476)),  # feet / bottom
]
EDGE = [(0, 0), (240, 0), (479, 0), (479, 160), (479, 320), (479, 479),
        (240, 479), (0, 479), (0, 320), (0, 160)]

def load(p):
    return np.asarray(Image.open(p).convert("RGB"), dtype=np.float32)

def warp(img, src_tri_pts, dst_tri_pts, tris, H, W):
    """Backward-map img so src points land on dst points."""
    out = np.zeros((H, W, 3), np.float32)
    ys, xs = np.mgrid[0:H, 0:W]
    pix = np.stack([xs.ravel(), ys.ravel(), np.ones(H * W)], axis=0)  # 3 x N
    # which triangle does each dst pixel fall in
    d = Delaunay(dst_tri_pts)
    # use the fixed triangulation 'tris'; find simplex per pixel via barycentrics
    owner = np.full(H * W, -1)
    for k, t in enumerate(tris):
        A = np.vstack([dst_tri_pts[t].T, np.ones(3)])  # 3x3
        try:
            bc = np.linalg.solve(A, pix)
        except np.linalg.LinAlgError:
            continue
        inside = (bc >= -1e-6).all(axis=0) & (owner < 0)
        owner[inside] = k
    owner[owner < 0] = 0
    sx = np.zeros(H * W); sy = np.zeros(H * W)
    for k, t in enumerate(tris):
        idx = np.nonzero(owner == k)[0]
        if not len(idx):
            continue
        A = np.vstack([dst_tri_pts[t].T, np.ones(3)])
        bc = np.linalg.solve(A, pix[:, idx])           # barycentric in dst tri
        src = src_tri_pts[t].T @ bc                     # 2 x n
        sx[idx], sy[idx] = src[0], src[1]
    for c in range(3):
        out[..., c] = map_coordinates(img[..., c], [sy.reshape(H, W), sx.reshape(H, W)], order=1, mode="nearest")
    return out

def main(wpath, apath, outdir, n):
    W_img, A_img = load(wpath), load(apath)
    pw = np.array([p[0] for p in PAIRS] + EDGE, np.float64)
    pa = np.array([p[1] for p in PAIRS] + EDGE, np.float64)
    tris = Delaunay((pw + pa) / 2).simplices
    for i in range(n):
        t = i / (n - 1)
        shape_t = t * t * (3 - 2 * t)                    # smoothstep for motion
        blend = min(1.0, max(0.0, (t - 0.15) / 0.7))     # colors cross later than shape starts
        blend = blend * blend * (3 - 2 * blend)
        pt = (1 - shape_t) * pw + shape_t * pa
        wa = warp(W_img, pw, pt, tris, S, S)
        aa = warp(A_img, pa, pt, tris, S, S)
        frame = (1 - blend) * wa + blend * aa
        Image.fromarray(np.clip(frame, 0, 255).astype(np.uint8)).save(f"{outdir}/f{i:02d}.png")
        print(i, end=" ", flush=True)

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4]))
