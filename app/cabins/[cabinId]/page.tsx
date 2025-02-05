import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

type Params = {
  params: {
    cabinId: string;
  };
};

export async function generateMetadata({ params }: Params) {
  const cabinId = Number(params.cabinId);
  const { name } = await getCabin(cabinId);
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  return cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));
}

export default async function Page({ params }: Params) {
  const cabinId = Number(params.cabinId);
  const cabin = await getCabin(cabinId);

  return (
    <div className="md:mx-auto md:mt-8 md:max-w-6xl">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="mb-8 text-center text-4xl font-semibold text-accent-500 md:mb-10 md:text-5xl">
          Reserve today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
