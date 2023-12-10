import Banner from "@/components/Banner";
import ImageBox from "@/components/ImageBox";
import ProfileCard from "@/components/ProfileCard";

const page = () => {
  const events = [
    {
      src: "/ethindia.png",
      heading: "Ethindia 2023",
      href: "/events/ethindia2023",
    },
  ];
  return (
    <div className="pt-[90px] w-full fcc pb-10">
      <div className="px-[10px] w-full mb-5 fcc">
        <ProfileCard />
      </div>
      <Banner />
      <h4 className="mb-7">Current events</h4>
      {/* <div className="flex w-full h-full gap-x-4 overflow-x-scroll scrollbar"> */}
      {events.map((event, i) => (
        <ImageBox
          key={i}
          href={event.href}
          src={event.src}
          className="flex-shrink-0 h-auto w-fit"
          leftText={event.heading}
        />
      ))}
      {/* </div> */}
    </div>
  );
};

export default page;
