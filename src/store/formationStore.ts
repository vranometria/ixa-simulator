import { defineStore } from "pinia";
import { Brigade, Busyo, ParameterMatrix, SkillArgs } from "../models";
import { Role } from "../constants";
import { Skill } from "../skilles";

export const useFormationStore = defineStore("formation", {
  state: () => ({
    formations: [
      new Brigade(),
      new Brigade(),
      new Brigade(),
      new Brigade(),
      new Brigade(),
      new Brigade(),
    ] as Brigade[],
  }),
  getters: {
    getAllUnitCount(): () => number {
      return () => {
        return this.formations.reduce((sum: number, brigade: Brigade) => {
          return sum + brigade.getUnitCount();
        }, 0);
      };
    },
    AllCost: (state): number => {
      if (!state.formations.length) return 0;
      return state.formations.reduce((sum: number, brigade: Brigade) => {
        return sum + brigade.getCost();
      }, 0);
    },
  },
  actions: {
    putUnit(
      brigadeIndex: number,
      unitIndex: number,
      busyo: Busyo,
      soldierType: string
    ) {
      this.formations[brigadeIndex].putUnit(unitIndex, busyo, soldierType);
    },

    removeUnit(brigadeIndex: number, unitIndex: number) {
      this.formations[brigadeIndex].units[unitIndex] = null;
    },

    getParameterMatrix(brigadeIndex: number): ParameterMatrix {
      const skillArgs = new SkillArgs();
      skillArgs.brigades = this.formations;
      skillArgs.numberOfUnits = this.getAllUnitCount();

      for (const brigade of this.formations as Brigade[]) {
        for (const unit of brigade.units) {
          if (unit == null) continue;
          unit.busyo.skills.forEach((skill: Skill) => {
            skill.preEffect(skillArgs);
          });
        }
      }     

      const currentBrigade = this.formations[brigadeIndex] as Brigade;
      skillArgs.lineNumber = brigadeIndex + 1;
      skillArgs.rankBonus = currentBrigade.getRankBonus();
      skillArgs.strategyBonus = currentBrigade.getStrategyBonus();

      let m = new ParameterMatrix();
      for (const unit of currentBrigade.units) {
        if(currentBrigade == null || unit == null) continue;
        skillArgs.init();
        skillArgs.totalAdditionalProbability = (() => {
          let t = 0;
          t += skillArgs.formationPreEffect.additionalProbability.all;
          if (unit.busyo.role == Role.Princess) {
            t += skillArgs.formationPreEffect.additionalProbability.princess;
            const bf = skillArgs.brigadePreEffects[brigadeIndex];
            t += bf.additionalProbability.princess;
          }
          return t;
        })();

        unit.busyo.skills.forEach((skill: Skill) => {
          skill.culcEffect(skillArgs);
        });
        m = m.add(skillArgs.getParameterMatrix());
      }
      return m;
    },
  },
});
