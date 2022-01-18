import Head from "next/head";
import { useCallback, useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/socket";
import { getAllStreamers } from "../lib/api";
import styles from "../styles/Home.module.css";

export default function Home({ allStreamers }) {
  const socket = useContext(SocketContext);
  const [streamers, setStreamers] = useState(allStreamers, []);

  const handleStatus = useCallback((payload) => {
    console.log(payload);
    const index = streamers.findIndex((item) => item.key === payload.room);
    if (index >= 0) {
      streamers[index].status = payload.status;
      setStreamers(() => [...streamers]);
    }
  });

  useEffect(() => {
    if (allStreamers.length > 0) {
      allStreamers.forEach((item) => {
        socket.emit("joinStatus", item.key);
      });
    }

    socket.on("statusToClient", handleStatus);
  }, [socket, allStreamers, handleStatus]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Tribonera - exemplo com Socket.io</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <img src="/tribonera.svg" alt="Tribonera" />
        </h1>

        <p className={styles.description}>Acompanhe a Tribo</p>

        <div className={styles.grid}>
          {streamers.map((item, key) => (
            <a
              key={key}
              href={`https://twitch.tv/${item.key}`}
              className={styles.card}
              target="_blank"
              rel="noreferrer"
            >
              <img src={`/streamer/${item.key}.png`} alt={item.name} />
              <div className="txt">
                <h2>{item.name}</h2>
                {item.status === true ? (
                  <p>
                    <span className={`${styles.status} ${styles.on}`}></span>{" "}
                    Live
                  </p>
                ) : (
                  <p>
                    <span className={`${styles.status} ${styles.off}`}></span>{" "}
                    Offline
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const allStreamers = await getAllStreamers();
  return {
    props: { allStreamers },
  };
}
