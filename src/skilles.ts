import { SkillArgs } from "./models";
import { Busyo, Skill } from "./types.d.ts";

export const SkillNames:string[] = [
    "天鷹炯眼",
];

export class SkillCreator {
    static create(name: string, busyo: Busyo): Skill | null {
        switch (name) {
            case "天鷹炯眼":
                return new 天鷹炯眼(busyo);
            default:
                return null;
        }
    }
}


class 天鷹炯眼 implements Skill {
    busyo: Busyo;
    name: string;
    ratio = 0.24;
    effect = 1.16;

    culcEffect(args: SkillArgs): void {
        const brigadeIndex = args.getBrigadeIndex(this.busyo);
        args.BrigadeEffects[brigadeIndex].all *= this.effect * this.ratio;
    }

    constructor(busyo: Busyo) {
        this.busyo = busyo;
        this.name = "天鷹炯眼";
    }
}