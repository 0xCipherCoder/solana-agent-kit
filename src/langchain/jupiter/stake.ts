import { BaseSolanaTool } from "../common/base";
import { StakeResponse } from "./types";

export class SolanaStakeTool extends BaseSolanaTool {
  name = "solana_stake";
  description = `This tool can be used to stake your SOL (Solana), also called as SOL staking or liquid staking.

  Inputs ( input is a JSON string ):
  amount: number, eg 1 or 0.01 (required)`;

  protected async _call(input: string): Promise<string> {
    try {
      const parsedInput = JSON.parse(input) || Number(input);

      const tx = await this.solanaKit.stake(parsedInput.amount);

      return JSON.stringify({
        status: "success",
        message: "Staked successfully",
        transaction: tx,
        amount: parsedInput.amount,
      } as StakeResponse);
    } catch (error: any) {
      return this.handleError(error);
    }
  }
}