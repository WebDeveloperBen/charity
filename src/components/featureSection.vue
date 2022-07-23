<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="py-16 bg-gray-50 overflow-hidden lg:py-24">
    <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
      <svg
        class="hidden lg:block absolute left-full transform -translate-x-1/2 -translate-y-1/4"
        width="404"
        height="784"
        fill="none"
        viewBox="0 0 404 784"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="404" height="784" fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)" />
      </svg>

      <div class="relative lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
        <div class="relative">
          <h3 class="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
            Welcome, my name's Ashley
          </h3>
          <p class="mt-3 text-lg text-gray-500">
            I'm not affiliated with
            <span class="italic">Share The Dignity.</span> Yet it's a wonderful organisation that
            I've donated too in previous years with my two young children. All information has come
            form the Share The Dignity website found here:
            <a class="text-blue-700" href="https://sharethedignity.org.au/itsinthebag"
              >Share The Dignity Website</a
            >
          </p>

          <dl class="mt-10 space-y-10">
            <div v-for="item in transferFeatures" :key="item.id" class="relative">
              <dt>
                <div
                  class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white"
                >
                  <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">{{ item.name }}</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                {{ item.description }}
              </dd>
            </div>
          </dl>
        </div>

        <div class="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
          <svg
            class="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
            width="784"
            height="404"
            fill="none"
            viewBox="0 0 784 404"
          >
            <defs>
              <pattern
                id="ca9667ae-9f92-4be7-abcb-9e3d727f2941"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="784" height="404" fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)" />
          </svg>
          <img class="relative mx-auto" width="400" src="/src/assets/Ashley_McBey.png" />
        </div>
      </div>

      <svg
        class="hidden lg:block absolute right-full transform translate-x-1/2 translate-y-12"
        width="404"
        height="784"
        fill="none"
        viewBox="0 0 404 784"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="404" height="784" fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { GlobeAltIcon, LightningBoltIcon, ScaleIcon } from "@heroicons/vue/outline"

const transferFeatures = [
  {
    id: 1,
    name: "Drop off at bunnings ",
    description:
      "The bags are dropped off at Bunnings by generous Aussies, such as yourself, and are distributed to 3,000 Australian charities that have registered with Share the Dignity. ",
    icon: GlobeAltIcon,
  },
  {
    id: 2,
    name: "Collection 18th - 27th November",
    description:
      "These charities then hand out your donated bags to people in need for Christmas. Our 2022 #ItsInTheBag collection points will be open from the 18th to the 27th of November at all Bunnings stores nationwide.",
    icon: ScaleIcon,
  },
  {
    id: 3,
    name: "721,877 bags donated to date",
    description:
      "In 2021, we were able to donate 100,174 #ItsInTheBag donations to women, girls and those who menstruate bringing our five-year total to 721,877 #ItsInTheBag donations.",
    icon: LightningBoltIcon,
  },
]
</script>
