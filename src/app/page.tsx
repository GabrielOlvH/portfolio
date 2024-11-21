
import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import styles from "./index.module.css";
import ExploreButton from "~/app/_components/exploreButton";
import Stars from "~/app/_components/stars";

export async function PlayAnimation() {
  return { success: true }
}

export default function Home() {
    const hello =  api.post.hello({text: "from tRPC"});

    void api.post.getLatest.prefetch();

    return (
        <HydrateClient>
            <Stars/>
            <main className={styles.main}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Gabriel Henrique de Oliveira</h1>

                    <div className={styles.exploreContainer}>
                        <ExploreButton/>
                    </div>
                </div>
            </main>
        </HydrateClient>
    );
}
