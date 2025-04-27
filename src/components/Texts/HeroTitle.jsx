// TULISAN HI-TECHNOLOGY 2025

const MainStyle = "md:text-[clamp(4rem,8vw,8rem)] text-[clamp(1rem,9vw,8rem)] ttl w-full whitespace-nowrap tracking-wider font-bold text-center";

const HeroTitle = () => {
  return (
    <>
      <h1 className={`${MainStyle} z-50`}>
        HI-TECHNOLOGY
        <br /> 2025
      </h1>
      <h1 className={`${MainStyle} -z-10 absolute top-0 text-purple-light left-1`}>
        HI-TECHNOLOGY
        <br /> 2025
      </h1>
      <h1 className={`${MainStyle} -z-10 absolute top-0 text-yellow right-1`}>
        HI-TECHNOLOGY
        <br /> 2025
      </h1>
    </>
  );
};

export default HeroTitle;
