import { MemberType } from "@/types/Member";
import Icon from "./Icon";
import Image from "next/image";
import { Instagram } from "lucide-react";

type MemberCellProps = {
  member: MemberType;
}

export default function MemberCell({ member }: MemberCellProps) {
  return (
    <div className="bg-foreground/10 p-2 border border-foreground/10">
      <div className="flex flex-col gap-2 items-start w-full p-4 bg-background rounded-2xl">
        <div className="flex items-center gap-6">
          <Icon image={member.icon} name={member.name} />
          <div className="flex flex-col items-start gap-1">
            <h3 className="font-semibold text-lg">
              {member.name}
            </h3>

            <div className="flex flex-col md:flex-row items-center md:gap-2">
              <span >{member.school}</span>
              <span >{member.faculty}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm">{member.role}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-4">
          {/* introduction */}
          <p className="text-sm text-left">
            {member.introduction}
          </p>

          {/* github and SNS URL */}
          <div className="flex items-center gap-4">
            <a href={member.githubUrl} className="text-sm" target="_blank" rel="noopener noreferrer">
              <Image src="/external-assets/github-logo/github-mark-white.png" alt="githubのアイコン" width={32} height={32} />
            </a>
            <a href={member.instagramUrl} className="text-sm" target="_blank" rel="noopener noreferrer">
              <Instagram size={28} className="text-white" />
            </a>
          </div>

          {/* 参加プロジェクトへのリンク */}
          <div className="flex items-center gap-4">
            <a href="" className="inline-block text-blue-300 hover:underline font-semibold text-sm">参加プロジェクト →</a>
          </div>
        </div>
      </div>
    </div>
  )
}