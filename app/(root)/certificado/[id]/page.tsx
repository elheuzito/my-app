import { getEventById } from "@/lib/actions/event.actions";
import { getOrderById } from "@/lib/actions/order.action";
import { getUserById } from "@/lib/actions/user.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import Image from "next/image";

import React from "react";

const Certificado = async ({ params: { id } }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const capitalizeFirstLetter = (string: string): string =>
    string.charAt(0).toUpperCase() + string.slice(1);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Pedido não encontrado.</p>
      </div>
    );
  }

  const order = await getOrderById(id);

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Pedido não encontrado.</p>
      </div>
    );
  }
  const event = await getEventById(order.data.event);
  const user = await getUserById(order.data.buyer);

  return (
    <>
      <div className="flex flex-col min-h-[100dvh] bg-white dark:bg-gray-950">
        <div className="flex-1 container px-4 md:px-6 py-12 md:py-20 lg:py-24 xl:py-32">
          <div className="grid gap-12 md:gap-16 lg:gap-20">
            <section className="grid gap-8 md:gap-10 lg:gap-12">
              <div className="grid gap-2 md:gap-3 lg:gap-4">
                <h2 className="text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl">
                  Certificado de Presença
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg">
                  Atribuido a
                </p>
              </div>
              <div className="p-6 md:p-8 lg:p-10 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <div className="relative">
                  <div className="grid grid-cols-1 gap-6 md:gap-8 lg:gap-10">
                    <div className="grid gap-2 md:gap-3 lg:gap-4">
                      <h3 className="text-xl font-bold tracking-tighter md:text-2xl lg:text-3xl">
                        {capitalizeFirstLetter(user.firstName)}{" "}
                        {capitalizeFirstLetter(user.lastName)}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg">
                        Certificado No. {Math.floor(Math.random() * 10000)}
                      </p>
                    </div>
                    <div className="grid gap-2 md:gap-3 lg:gap-4">
                      <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg">
                        Emitido no dia {formatDateTime(new Date()).dateOnly}
                      </p>
                      <p className="text-gray-500 dark:text-gray-700 text-base md:text-lg">
                        Por comparecer ao evento {event.title.toUpperCase()}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-1 md:gap-3 lg:gap-4">
                      <div>
                        <Image
                          src="/assets/images/assinatura_1.png"
                          alt="assinatura"
                          height={100}
                          width={160}
                        />
                        <p className="py-2 text-xl tracking-tighter md:text-2xl lg:text-3xl border-b-[1px] border-gray-700">
                          {capitalizeFirstLetter(event.organizer.firstName)}{" "}
                          {capitalizeFirstLetter(event.organizer.lastName)}
                        </p>
                        <p className="text-gray-800 dark:text-gray-400 text-base md:text-lg">
                          Organizador
                        </p>
                      </div>
                      <div className="flex items-end justify-end">
                        <Image
                          src="/assets/images/logo.svg"
                          alt="logo"
                          height={32}
                          width={32}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0">
                    <Image
                      src="/assets/images/award.png"
                      alt="logo"
                      height={100}
                      width={100}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Certificado; 