import { NextRequest, NextResponse } from "next/server";
import { authKey, USER_ROLE } from "./constants";
import { jwtHelpers } from "./utils/jwtHelpers";

export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const jwt = request.cookies.get(authKey);

  if (!jwt) {
    return NextResponse.redirect(
      new URL(`/sign-in?from=${pathName}`, request.url),
    );
  }

  let decoded: any;

  try {
    decoded = (await jwtHelpers.verifyToken(
      jwt.value,
      process.env.JWT_SECRET as string,
    )) as unknown as { payload: any };

    if (
      pathName.includes("admin") &&
      ![USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN].includes(decoded?.payload?.role)
    ) {
      return NextResponse.redirect(
        new URL(`/sign-in?from=${pathName}`, request.url),
      );
    }
  } catch (error) {
    return NextResponse.redirect(
      new URL(`/sign-in?from=${pathName}`, request.url),
    );
  }
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path",
    "/checkout",
    "/wishlist",
    "/account",
    "/account/:path",
    "/orders",
    "/orders/:path",
    "/payment",
  ],
};
