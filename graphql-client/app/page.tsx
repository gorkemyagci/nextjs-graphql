import { redirect } from "next/navigation"

export default async function Home() {
  await redirect("/todos")
  return <></>
}
