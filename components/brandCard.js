/* eslint-disable @next/next/no-img-element */
import { Card } from "flowbite-react";

export default function BrandCard({ brand }) {
  return (
    <div className="max-w-sm">
      <Card imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {brand.name}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {brand.id}
        </p>
      </Card>
    </div>
  );
}
