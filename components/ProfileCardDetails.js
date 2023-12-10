import Image from "next/image";

const ProfileCardDetails = ({
  name,
  socialTags = [{ icon: "twitter", id: "dammcoder" }],
  isDark = false,
}) => {
  return (
    <>
      <div className=" py-5 ps-3 flex flex-col justify-between h-full gap-y-5">
        <div className="">
          <h4
            className="profileCardH"
            style={{
              color: isDark ? "var(--text)" : "var(--bg1)",
            }}
          >
            PROFILE CARD
          </h4>
          <h2>{name || "DammmCoder"}</h2>
        </div>
        {/* social tags */}
        {socialTags.map(
          (tag, i) =>
            tag.id && (
              <div key={i} className="frc gap-x-2 ">
                {tag.icon && (
                  <Image
                    src={"/" + tag.icon + (!isDark ? "White" : "") + ".png"}
                    alt={tag.icon}
                    width={14}
                    height={14}
                  />
                )}
                <p
                  style={{
                    color: isDark ? "var(--text)" : "var(--bg1)",
                  }}
                  className="socialTag "
                >
                  {tag.id}
                </p>
              </div>
            )
        )}
      </div>
    </>
  );
};

export default ProfileCardDetails;
