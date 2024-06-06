export type WeaponFeature =
  | {
      type: "dr_bonus";
      location: string;
      amount: number;
    }
  | {
      type: "weapon_bonus";
      selection_type: string;
      specialization: {
        compare: string;
        qualifier: string;
      };
      amount: number;
    };

export type WeaponDamage = {
  type: string;
  base: string;
};

export type WeaponDefault = {
  type: string;
  modifier?: number;
  name?: string;
  specialization?: string;
};

export type Weapon = {
  id: string;
  type: "ranged_weapon";
  damage: WeaponDamage;
  strength: string;
  accuracy: string;
  range: string;
  rate_of_fire: string;
  shots: string;
  bulk: string;
  recoil: string;
  defaults: WeaponDefault[];
  calc: {
    damage: string;
  };
};

export type Calc = {
  extended_value: number;
  extended_weight: string;
};

export type Equipment = {
  id: string;
  type: "equipment";
  description: string;
  reference: string;
  tech_level: string;
  legality_class?: string;
  tags: string[];
  quantity: number;
  value: number;
  weight: string;
  features?: Feature[];
  weapons?: Weapon[];
  calc: Calc;
};
