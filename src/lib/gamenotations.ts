import * as ADNotations from "@antimatter-dimensions/notations";

export default {
    standard: new ADNotations.StandardNotation(),
    mixedStandard: new ADNotations.MixedScientificNotation(),
    engineering: new ADNotations.EngineeringNotation(),
    emoji: new ADNotations.EmojiNotation(),
    letters: new ADNotations.LettersNotation(),
    logarithm: new ADNotations.LogarithmNotation()
}