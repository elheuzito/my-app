import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  const events = await getAllEvents({
    query: '',
    category: '',
    page: 1,
    limit: 6,
  });

  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
 
  console.log(userId);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 md:grid-cols-2 gap-5 2xl:gap-3">
          <div className="flex flex-col justify-center gap-8 px-1">
           <h1 className="h1-bold">
           Organize e Participe: Sua plataforma de eventos.
          </h1>
          <p className="p-regular-18 md:p-regular-20">
          Conecte-se e aprenda conosco aqui hospedamos e divulgamos seus eventos acadêmicos em poucos cliques.
         </p>
          <Button size="lg" asChild className="button w-full sm:w-fit">
          <Link href="#events"> Descubra </Link>
          </Button>
          </div>
          <div className="flex justify-center items-center">
            <Image
              src="/assets/images/placehold.png"
              alt="hero"
              width={800}
              height={1100}
              className="rounded max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
            />
          </div>
        </div>
      </section>
      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Comece agora sua jornada</h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
        <Collection
          data={events?.data}
          emptyTitle="Nenhum evento encontrado"
          emptyStateSubtext="Tente pesquisar novamente"
          collectionType='All_Events'
          limit={6}
          page={1}
          totalPages={2}
        />
        </div>
      </section>
    </>
    
  )
}