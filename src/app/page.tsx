// page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route"; // Adjust path to your auth options
import Layout from "./layout";

export default async function Home() {
  const session = await getServerSession(authOptions);
  // console.log(session.user.id)

  return (
    <Layout session={session}>
      <main className="flex w-screen h-screen justify-between">
        <section className="flex flex-col justify-start mx-auto mt-12 gap-8 p-16">
          <header>
            <h2 className="text-8xl">Memory Lane</h2>
          </header>
          <span className="flex flex-col gap-4">
            <h3 className="text-4xl">Digital time capsules</h3>
            <p className="text-2xl">Send a memory as a gift</p>
          </span>
          <div className="flex gap-8">
            <span className="border-slate-800 border-2 p-2">
              <p>Learn more</p>
              <a href="#"></a>
            </span>
            <span className="border-slate-800 border-2 p-2">
              <p>Send a capsule</p>
              <a href="#"></a>
            </span>
          </div>
        </section>
        <div className="w-1/2 border-2">
          <img
            className="object-cover h-full"
            src="https://img.freepik.com/free-photo/travel-composition-with-compass-blank-notebook_23-2147604726.jpg?t=st=1732112233~exp=1732115833~hmac=8bbf3cdf4cb78c96460e0507d89fb0adcaec502c05953c39b132c5a4364ebbce&w=996"
          />
        </div>
      </main>
    </Layout>
  );
}
