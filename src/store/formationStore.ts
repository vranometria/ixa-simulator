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
  getters: {},
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
      const d = {
        unitCount: 0,
      };

      const skillArgs = new SkillArgs();
      skillArgs.brigades = this.formations;

      for (const brigade of this.formations as Brigade[]) {
        d.unitCount += brigade.units.length;
        for (const unit of brigade.units) {
          if (unit == null) continue;
          unit.busyo.skills.forEach((skill: Skill) => {
            skill.preEffect(skillArgs);
          });
        }
      }     

      skillArgs.numberOfUnits = d.unitCount;

      const currentBrigade = this.formations[brigadeIndex];
      let m = new ParameterMatrix();
      for (const unit of currentBrigade.units) {
        if(currentBrigade == null || unit == null) continue;
        skillArgs.lineNumber = brigadeIndex;
        skillArgs.isImitating = false;
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
        skillArgs.init();
      }
      return m;
    },
  },
});
