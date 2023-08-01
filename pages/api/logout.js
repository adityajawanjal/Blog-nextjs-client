import cookie from "cookie";

export default function handler(req, res) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", req.body.token, {
      httpOnly: true,
      secure: false,
      expires: new Date(0),
      path: "/",
      sameSite: "strict",
    })
  );
  res.status(200).json({ ok: true });
}
