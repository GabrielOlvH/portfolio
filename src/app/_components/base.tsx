"use client"

import Stars from "~/app/_components/stars";
import ExploreButton from "~/app/_components/exploreButton";
import {useState} from "react";

export default function Base() {
    const [velocityFactor, setVelocityFactor] = useState(0.5);
    return (
        <>
            <Stars/>
            <ExploreButton/>
        </>
    )
}