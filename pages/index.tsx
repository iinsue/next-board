import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Next Board</title>
      </Head>
      <Link href="/board">게시판</Link>
    </>
  );
}
