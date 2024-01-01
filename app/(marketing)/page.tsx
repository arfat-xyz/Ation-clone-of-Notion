import Footer from "./_components/footer";
import Heading from "./_components/heading";
import Heroes from "./_components/heroes";

const page = () => {
  return (
    <div className="min-h-full flex mx-auto flex-col">
      <div className="flex  dark:bg-[#1F1f1f] flex-col tiems-center justify-center md:justify-start text-center gap-y-8 flex-1">
        <Heading />
        <Heroes />
        <Footer />
      </div>
    </div>
  );
};

export default page;
