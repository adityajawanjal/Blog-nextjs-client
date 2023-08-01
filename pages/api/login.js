import cookie from "cookie";

export default function handler(req, res) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", req.body.token, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "strict",
    })
  );
  res.status(200).json({ ok: true });
}
