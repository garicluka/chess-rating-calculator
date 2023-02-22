import Head from "next/head";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export default function Home() {
    const [finalRating, setFinalRating] = useState("1000");
    const [kScore, setKScore] = useState("10");
    const [initialRating, setInitialRating] = useState("1000");
    const [opponents, setOpponents] = useState([
        { rating: "1000", result: "Draw", key: uuid() as string },
    ]);

    const calculateFinalRating = () => {
        const myRating = Number(initialRating);
        const k = Number(kScore);

        let totalRatingChange = 0;
        for (let opponent of opponents) {
            const opponentRating = Number(opponent.rating);
            const result =
                opponent.result === "Win"
                    ? 1
                    : opponent.result === "Draw"
                    ? 0.5
                    : 0;

            const expectedScore =
                1 / (1 + Math.pow(10, (opponentRating - myRating) / 400));
            const ratingChange = k * (result - expectedScore);
            totalRatingChange += ratingChange;
        }

        const newRating = myRating + totalRatingChange;

        setFinalRating(newRating.toFixed());
    };

    const addOpponent = () => {
        setOpponents([
            { rating: "1000", result: "Draw", key: uuid() },
            ...opponents,
        ]);
    };

    const changeOpponent = (
        i: number,
        o: { rating: string; result: string; key: string }
    ) => {
        setOpponents([...opponents.slice(0, i), o, ...opponents.slice(i + 1)]);
    };

    return (
        <>
            <Head>
                <title>chess calculator</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <div className="bg-[#6F73DF] w-full h-screen grid place-items-center p-[37px] smob:p-[20px]">
                <div className="w-full max-w-[816px] h-full bg-[#EBEBEB28] rounded-[34px] p-[58px] relative flex flex-col mob:p-[38px] mob:max-w-[575px] smob:p-[20px] smob:rounded-[20px]">
                    <div>
                        <div className="flex justify-between">
                            <div className="flex flex-col items-center gap-[43px]">
                                <button
                                    className="w-[300px] h-[123px] font-bold text-[28px] bg-[#7646ff] rounded-[10px] border-[2px] shadow-[0_0_18px_#ffffff25] mob:w-[160px] mob:h-[82px] mob:text-[19px] smob:text-[15px] smob:w-[130px] smob:h-[72px]"
                                    onClick={calculateFinalRating}
                                >
                                    NEW RATING
                                </button>
                                <div className="flex flex-col items-center gap-[16px]">
                                    <p className="text-[28px] drop-shadow-[0_0_11px_#00000044] mob:text-[20px]">
                                        K Score:
                                    </p>
                                    <input
                                        className="text-center pl-[15px] text-[24px] font-bold border border-[#FFA077] bg-[#00000063] shadow-[0_0_5px_#ffffff25] grid place-items-center place-content-centerrounded-[10px] w-[86px] h-[64px] rounded-[10px] mob:text-[18px] mob:w-[70px] mob:h-[52px] smob:pl-0"
                                        type="number"
                                        value={kScore}
                                        onChange={(e) =>
                                            setKScore(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-[43px]">
                                <p className="bg-[#00000063] w-[300px] h-[123px] font-bold text-[35px] rounded-[10px] grid place-items-center mob:w-[160px] mob:h-[82px] mob:text-[20px] smob:text-[18px] smob:w-[130px] smob:h-[72px]">
                                    {finalRating}
                                </p>
                                <div className="flex flex-col items-center gap-[16px]">
                                    <p className="text-[28px] drop-shadow-[0_0_11px_#00000044] mob:text-[20px]">
                                        Initial Rating:
                                    </p>
                                    <input
                                        className="text-[24px] font-bold w-[150px] h-[64px] text-center bg-[#00000063] pl-[14px] rounded-[10px] border-b-[2px] border-b-[#00ff38] mob:text-[20px] mob:w-[122px] mob:h-[52px] smob:pl-0"
                                        type="number"
                                        value={initialRating}
                                        onChange={(e) =>
                                            setInitialRating(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-[66px]">
                            <button
                                className="text-[21px] bg-[#6f73df] w-[318px] h-[52px] rounded-[10px] font-bold mob:text-[16px] mob:w-[282px] mob:h-[46px]"
                                onClick={addOpponent}
                            >
                                Add New Opponent
                            </button>
                        </div>
                    </div>
                    <div className="overflow-y-scroll flex-grow-[1] basis-0 scrollbar-hide mt-[16px] rounded-[10px]">
                        {opponents.map((opponent, index) => (
                            <div
                                className="bg-[#00000063] rounded-[13px] my-[10px] px-[75px] py-[31px] flex justify-between mob:px-[15px] mob:py-[20px] smob:flex-col smob:justify-center smob:items-center smob:gap-[20px]"
                                key={opponent.key}
                            >
                                <div className="flex items-center gap-[20px]">
                                    <p className="text-[25px] mob:text-[18px]">
                                        Score:
                                    </p>
                                    <select
                                        className="text-[22px] border border-[#ffa077] shadow-[0_0_5px_#ffffff25] bg-[#0000001A] w-[107px] h-[62px] rounded-[10px] font-bold appearance-none text-center mob:text-[16px] mob:w-[74px] mob:h-[43px]"
                                        onChange={(e) =>
                                            changeOpponent(index, {
                                                rating: opponent.rating,
                                                result: e.target.value,
                                                key: opponent.key,
                                            })
                                        }
                                        defaultValue={opponent.result}
                                    >
                                        <option className="font-bold bg-[#4C4D80] p-[5px] block">
                                            Lose
                                        </option>
                                        <option className="font-bold bg-[#4C4D80] py-[10px]">
                                            Draw
                                        </option>
                                        <option className="font-bold bg-[#4C4D80]">
                                            Win
                                        </option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-[20px]">
                                    <p className="text-[25px] mob:text-[18px]">
                                        Rating:
                                    </p>
                                    <input
                                        className="text-[22px] w-[134px] h-[62px] bg-[#0000001A] rounded-[10px] text-center pl-[14px] border-b-[2px] border-b-[#00ff38] font-bold mob:text-[16px] mob:w-[93px] mob:h-[43px] smob:pl-0"
                                        type="number"
                                        value={opponent.rating}
                                        onChange={(e) =>
                                            changeOpponent(index, {
                                                rating: e.target.value,
                                                result: opponent.result,
                                                key: opponent.key,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
