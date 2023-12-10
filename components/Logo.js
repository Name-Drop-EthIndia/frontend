import Image from "next/image";
import Link from "next/link";

const Logo = ({ size = 54 }) => {
  return (
    <Link className="hoverExpand" href={"/"}>
      <Image
        priority={true}
        src={"/logo.png"}
        alt="logo"
        width={size}
        height={size}
      />
    </Link>
  );
};

export default Logo;
