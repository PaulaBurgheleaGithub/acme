"use client";
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import React, { Suspense } from 'react';
const Spline = React.lazy(() => import('@splinetool/react-spline'));
import DashboardSkeleton from '@/app/ui/skeletons';




export default function Page() {

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className='flex h-20 shrink-0 items-end rounded-lg p-4 md:h-52 bg-blue-400'>
      <AcmeLogo />
      </div>

      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Acme.</strong> This is the example from{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            <p>Demo User: </p>
            <p>Demo Password: </p>
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-[60%] md:px-10 md:py-12">
          <div className='hidden md:block w-[1000] h-[620px] sm:hidden relative'>
            <Suspense fallback={<DashboardSkeleton/>}>
              <Spline scene="https://prod.spline.design/43YxN7w76FQJdZbu/scene.splinecode" />
            </Suspense>
          </div>
          <Image 
            src="/hero-mobile.png"
            width={760}
            height={620}
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}
