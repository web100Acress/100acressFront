import React, { useEffect } from 'react';
import { Skeleton } from 'antd';
import Aos from 'aos';

const ProjectsSkeleton = () => {

    useEffect(() => {
      Aos.init();
    }, []);
  return (
    <div data-aos="zoom-in-down" className="py-3">
      <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6 py-2">
        <div className="flex items-center">
          <Skeleton.Input active size="large" style={{ width: 250 }} />
        </div>
        <div className="ml-2 hidden sm:block">
          <Skeleton.Button active size="medium" shape="round" />
        </div>
      </div>
      <section className="flex flex-col items-center bg-white mt-3">
        <div className="grid max-w-md grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
          {[...Array(4)].map((_, index) => (
            <article
              key={index}
              className="mb-2 overflow-hidden rounded-md border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
            >
              <div className="relative flex p-3 align-center justify-center">
                <Skeleton.Image style={{ width: '270px', height: '200px' }} active className="w-[200%] h-[100%] rounded-lg object-fill" />
                <div className="absolute top-5 right-5">
                  <Skeleton.Avatar active size="small" shape="circle" />
                </div>
              </div>
              <div className="pt-0 p-3">
                <Skeleton.Input active size="default" style={{ width: 250 }} />
                <Skeleton.Input active size="small" style={{ width: 150, marginTop: 5 }} />
                <ul className="box-border flex list-none items-center border-b border-solid border-gray-200 px-0 py-2">
                  <li className="mr-4 flex items-center text-left">
                    <Skeleton.Input active size="small" style={{ width: 150 }} />
                  </li>
                </ul>
                <ul className="m-0 flex list-none items-center justify-between px-0 pb-0">
                  <li className="text-left">
                    <Skeleton.Input active size="small" style={{ width: 100 }} />
                  </li>
                  <li className="text-left">
                    <Skeleton.Button active size="small" shape="round" />
                  </li>
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectsSkeleton;
