import MemberCell from "./MemberCell";
import { client } from "@/libs/microcms";
import { MemberType } from "@/types/Member";

async function getMembers(): Promise<MemberType[]> {
  const data = await client.get({
    endpoint: 'members',
  });
  return data.contents;
}

export default async function MembersSection() {
  const members = await getMembers();

  return (
    <section className="w-full flex flex-col items-center divide-effect bg-background">
      <div className="w-full max-w-[1440px] flex flex-row items-stretch relative">
        <div className="grow-[1] border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-lg:hidden [--pattern-fg:var(--foreground)]/10"></div>
        <div className="w-full max-w-7xl">
          <div className="min-h-[80vh] grid auto-rows-min md:grid-cols-2 lg:grid-cols-3 p-4 items-start">
            {members.map((member) => (
              <MemberCell key={member.id} member={member} />
            ))}
          </div>
        </div>
        <div className="grow-[1] border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-lg:hidden [--pattern-fg:var(--foreground)]/10"></div>
      </div>
    </section>
  )
}