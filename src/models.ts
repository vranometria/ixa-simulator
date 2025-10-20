import { RankBonus, Role, SoldierCategory, SoldierType } from "./constants";
import { createSkill, Skill } from "./skilles";
import type { AdditionalProbability, BusyoInfo, Unit } from "./types.d.ts";

class PreEffect {
  additionalCost: number;
  additionalProbability: AdditionalProbability;
  additionalTakuetsuProbability: AdditionalProbability;
  reduceCost: number;
  busyoDiffenceEffect: Record<string, number>;

  additionalEffect: ParameterMatrix;

  constructor() {
    this.additionalCost = 0;
    this.additionalProbability = { all: 0, princess: 0 };
    this.additionalTakuetsuProbability = { all: 0, princess: 0 };
    this.reduceCost = 0;
    this.busyoDiffenceEffect = {};
    this.additionalEffect = new ParameterMatrix();
  }
}

export class Busyo {
  id: string;
  name: string;
  cost: number;
  role: Role;
  forceSize: number;
  rank: number;
  attack: number;
  defense: number;
  strategy: number;
  skills: Skill[] = new Array(4).fill(null);

  constructor() {
    this.id = crypto.randomUUID();
  }

  getFirstSkill(): Skill | null {
    return this.skills[0] ?? null;
  }

  toBusyoInfo(): BusyoInfo {
    return {
      id: this.id,
      name: this.name,
      cost: this.cost,
      role: this.role,
      forceSize: this.forceSize,
      rank: this.rank,
      attack: this.attack,
      defense: this.defense,
      strategy: this.strategy,
      skillNames: this.skills.map((s) => s.name),
    };
  }

  loadFromBusyoInfo(info: BusyoInfo): void {
    this.id = info.id;
    this.name = info.name;
    this.cost = info.cost;
    this.role = Role[info.role as keyof typeof Role];
    this.forceSize = info.forceSize;
    this.rank = info.rank;
    this.attack = info.attack;
    this.defense = info.defense;
    this.strategy = info.strategy;
    this.skills = info.skillNames.map(name => createSkill(name, this));
  }
}

export class Brigade {
  units: Unit[] = [null, null, null, null];

  belongs(busyo: Busyo): boolean {
    if (!busyo) return false;
    return this.units.some((u) => u && u.busyo.id === busyo.id);
  }

  putUnit(unitIndex: number, busyo: Busyo, soldierType: string) {
    this.units[unitIndex] = { busyo, soldierType };
  }

  getUnitCount() {
    return this.units.filter((u) => u != null && u.busyo && u.soldierType)
      .length;
  }

  getCost(): number {
    return this.units.reduce((sum, u) => {
      if (u == null || u.busyo == null) return sum;
      return sum + u.busyo.cost;
    }, 0);
  }

  getTotalRank(): number {
    return this.units.reduce((sum, u) => {
      if (u == null || u.busyo == null) return sum;
      return sum + u.busyo.rank;
    }, 0);
  }

  getRankBonus(): number {
    const rank = this.getTotalRank();
    console.log("rank: ", rank);
    return rank in RankBonus ? RankBonus[rank] : 0;
  }

  // 兵法ボーナス
  getStrategyBonus(): number {
    const strategies = this.units.map((u) => u?.busyo?.strategy ?? 0);
    const maxStrategy = Math.max(...strategies);
    const totalStrategy = strategies.reduce((sum, val) => sum + val, 0);
    const otherStrategy = totalStrategy - maxStrategy;
    return (maxStrategy + otherStrategy / 6) / 100 / 100;
  }
}

export class SkillArgs {
  numberOfUnits: number;
  formationPreEffect: PreEffect = new PreEffect();
  brigadePreEffects: PreEffect[] = [...Array(6)].map(() => new PreEffect());
  brigades: Brigade[];

  // 旅団単位
  lineNumber: number;
  rankBonus: number;
  strategyBonus: number;

  // スキル単位
  isImitating: boolean;
  totalAdditionalProbability: number;

  results: ParameterMatrix[];

  constructor() {
    this.numberOfUnits = 0;
    this.brigades = [];
    this.lineNumber = 0;
    this.isImitating = false;
    this.totalAdditionalProbability = 0;
    this.results = [
      new ParameterMatrix(),
      new ParameterMatrix(),
      new ParameterMatrix(),
      new ParameterMatrix(),
    ];
  }

  init(): void {
    this.isImitating = false;
    this.totalAdditionalProbability = 0;
    this.results = [
      new ParameterMatrix(),
      new ParameterMatrix(),
      new ParameterMatrix(),
      new ParameterMatrix(),
    ];
  }

  getBrigadeIndex(busyo: Busyo): number {
    const index = this.brigades.findIndex((brigade) => brigade.belongs(busyo));
    if (index === -1) {
      throw new Error(`Busyo ${busyo.name} is not found in any brigade.`);
    }
    return index;
  }

  getBrigate(busyo: Busyo): Brigade | null {
    const index = this.getBrigadeIndex(busyo);
    return index >= 0 ? this.brigades[index] : null;
  }

  getReader(busyo: Busyo): Busyo | null {
    const reader = this.getBrigate(busyo).units[0].busyo;
    return reader.id === busyo.id ? null : reader;
  }

  putResult(brigadeIndex: number, matrix: ParameterMatrix): void {
    this.results[brigadeIndex] = this.results[brigadeIndex].add(matrix);
  }

  getParameterMatrix(): ParameterMatrix {
    const matrix = new ParameterMatrix();

    for (const result of this.results) {
      matrix.lancer += result.lancer;
      matrix.cavalry += result.cavalry;
      matrix.archer += result.archer;
      matrix.weapon += result.weapon;
    }
    return matrix;
  }

  getTotalCostReduction(): number {
    let totalReduction = 0;
    console.log("b", this.brigadePreEffects);

    for (const brigade of this.brigadePreEffects) {
      totalReduction += brigade.reduceCost;
    }
    return totalReduction;
  }
}

export class ParameterMatrix {
  lancer: number;
  cavalry: number;
  archer: number;
  weapon: number;

  constructor() {
    this.lancer = 0;
    this.cavalry = 0;
    this.archer = 0;
    this.weapon = 0;
  }

  setAll(value: number): void {
    this.lancer = value;
    this.cavalry = value;
    this.archer = value;
    this.weapon = value;
  }

  add(other: ParameterMatrix): ParameterMatrix {
    const m = new ParameterMatrix();
    m.lancer = this.lancer + other.lancer;
    m.cavalry = this.cavalry + other.cavalry;
    m.archer = this.archer + other.archer;
    m.weapon = this.weapon + other.weapon;
    return m;
  }

  multiple(other: ParameterMatrix): ParameterMatrix {
    const m = new ParameterMatrix();
    m.lancer = this.lancer * other.lancer;
    m.cavalry = this.cavalry * other.cavalry;
    m.archer = this.archer * other.archer;
    m.weapon = this.weapon * other.weapon;
    return m;
  }
}

export class Procs {
  static culcBusyoPowerMatrix(
    skillArgs: SkillArgs,
    units: Unit[]
  ): ParameterMatrix {
    const matrix = new ParameterMatrix();

    for (const unit of units) {
      if (unit == null) continue;

      const busyo = unit.busyo;
      const brigadeIndex = skillArgs.getBrigadeIndex(busyo);
      const busyoEffect: number =
        skillArgs.brigadePreEffects[brigadeIndex].busyoDiffenceEffect[
          busyo.id
        ] ?? 1;
      const soldierDefence: number =
        SoldierType.map[unit.soldierType]?.defense ?? 1;
      const value: number =
        busyo.defense * busyoEffect + busyo.forceSize * soldierDefence;

      switch (SoldierType.getElementByName(unit.soldierType)) {
        case SoldierCategory.Lancer:
          matrix.lancer += value;
          break;
        case SoldierCategory.Cavalry:
          matrix.cavalry += value;
          break;
        case SoldierCategory.Archer:
          matrix.archer += value;
          break;
        case SoldierCategory.Weapon:
          matrix.weapon += value;
          break;
      }
    }

    return matrix;
  }

  static culcTotalAdditionalProbability(
    skillArgs: SkillArgs,
    unit: Unit,
    brigadeIndex: number
  ): number {
    let t = 0;
    t += skillArgs.formationPreEffect.additionalProbability.all;
    if (unit.busyo.role == Role.Princess) {
      t += skillArgs.formationPreEffect.additionalProbability.princess;
      const bf = skillArgs.brigadePreEffects[brigadeIndex];
      t += bf.additionalProbability.princess;
    }
    return t;
  }
}
