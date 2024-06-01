import { createCharacter } from "~/gurps/character";
import { useMemo, useState } from "react";
import InputField from "~/components/InputField";
import AttributeField from "~/components/AttributeField";

export function meta() {
  return [
    { title: "Create a Character" },
    { name: "description", content: "Create a new character" },
  ];
}

export default function Create() {
  const [forceRenderKey, setForceRenderKey] = useState(0);
  const forceRerender = () => {
    setForceRenderKey((prevKey) => prevKey + 1);
  };

  const character = useMemo(() => {
    const character = createCharacter();

    character.addEventListener("change", forceRerender);

    return character;
  }, []);

  return (
    <main>
      <h1>Create a Character</h1>
      <form action="/characters" method="post">
        <div className="flex gap-4 flex-wrap">
          <fieldset className="w-fit">
            <legend>Identity</legend>
            <InputField
              label="Name"
              value={character.name}
              onChange={(name) => (character.name = name as string)}
            />
          </fieldset>
          <fieldset>
            <legend>150 Points</legend>
            <table className="w-fit">
              <tbody>
                <tr>
                  <td className="text-right">{150 - character.points.spent}</td>
                  <td>Unspent</td>
                </tr>
                <tr>
                  <td className="text-right">{character.points.attributes}</td>
                  <td>Attributes</td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        </div>
        <div className="flex gap-4 flex-wrap h-fit">
          <fieldset className="w-fit h-fit">
            <legend>Basic Attributes</legend>

            <div className="flex gap-2 items-end">
              <div className="text-xl">[{character.strength.cost}]</div>
              <AttributeField
                label="Strength (ST)"
                type="number"
                value={character.strength.score}
                onChange={(value) => {
                  character.strength.score = ~~value;
                }}
              />
            </div>

            <div className="flex gap-2 items-end">
              <div className="text-xl">[{character.dexterity.cost}]</div>
              <AttributeField
                label="Dexterity (DX)"
                type="number"
                value={character.dexterity.score}
                onChange={(value) => {
                  character.dexterity.score = ~~value;
                }}
              />
            </div>

            <div className="flex gap-2 items-end">
              <div className="text-xl">[{character.intelligence.cost}]</div>
              <AttributeField
                label="Intelligence (IQ)"
                type="number"
                value={character.intelligence.score}
                onChange={(value) => {
                  character.intelligence.score = ~~value;
                }}
              />
            </div>

            <div className="flex gap-2 items-end">
              <div className="text-xl">[{character.health.cost}]</div>
              <AttributeField
                label="Health (HT)"
                type="number"
                value={character.health.score}
                onChange={(value) => {
                  character.health.score = ~~value;
                }}
              />
            </div>
          </fieldset>

          <fieldset className="w-fit h-fit">
            <legend>Secondary Attributes</legend>

            <div className="flex gap-2 items-end">
              <div className="text-xl">[{character.will.cost}]</div>
              <AttributeField
                label="Will"
                type="number"
                value={character.will.score}
                onChange={(value) => {
                  character.will.score = ~~value;
                }}
              />
            </div>

            <div className="flex gap-2 items-end">
              <div className="text-xl">[{character.frightCheck.cost}]</div>
              <AttributeField
                label="Fright Check"
                type="number"
                value={character.frightCheck.score}
                onChange={(value) => {
                  character.frightCheck.score = ~~value;
                }}
              />
            </div>

            <div className="flex gap-2 items-end">
              <div className="text-xl">[{character.intelligence.cost}]</div>
              <AttributeField
                label="Perception"
                type="number"
                value={character.intelligence.score}
                onChange={(value) => {
                  character.intelligence.score = ~~value;
                }}
              />
            </div>

            <div className="flex gap-2 items-end">
              <div className="text-xl">[{character.vision.cost}]</div>
              <AttributeField
                label="Vision"
                type="number"
                value={character.vision.score}
                onChange={(value) => {
                  character.vision.score = ~~value;
                }}
              />
            </div>

            <div className="flex gap-2 items-end">
              <div className="text-xl">[{character.hearing.cost}]</div>
              <AttributeField
                label="Hearing"
                type="number"
                value={character.hearing.score}
                onChange={(value) => {
                  character.hearing.score = ~~value;
                }}
              />
            </div>
            <div className="flex gap-2 items-end">
              <div className="text-xl">[{character.tasteAndSmell.cost}]</div>
              <AttributeField
                label="Taste And Smell"
                type="number"
                value={character.tasteAndSmell.score}
                onChange={(value) => {
                  character.tasteAndSmell.score = ~~value;
                }}
              />
            </div>
            <div className="flex gap-2 items-end">
              <div className="text-xl">[{character.touch.cost}]</div>
              <AttributeField
                label="Touch"
                type="number"
                value={character.touch.score}
                onChange={(value) => {
                  character.touch.score = ~~value;
                }}
              />
            </div>
            <div className="flex gap-2 items-end">
              <div className="text-xl">[{character.basicSpeed.cost}]</div>
              <AttributeField
                label="Basic Speed"
                type="number"
                value={character.basicSpeed.score}
                onChange={(value) => {
                  character.basicSpeed.score = ~~value;
                }}
              />
            </div>
            <div className="flex gap-2 items-end">
              <div className="text-xl">[{character.basicMove.cost}]</div>
              <AttributeField
                label="Basic Move"
                type="number"
                value={character.basicMove.score}
                onChange={(value) => {
                  character.basicMove.score = ~~value;
                }}
              />
            </div>
          </fieldset>
        </div>
        <button className="btn" type="submit">
          Create
        </button>
      </form>
    </main>
  );
}
