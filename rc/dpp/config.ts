import { $XDG_DATA_HOME } from "dpp_helper";
import { BaseConfig, ConfigArguments, Plugin } from "dpp_vim";
import { PLUGINS } from "./plugins.ts";

interface LazyMakeStateResult {
  plugins: Plugin[];
  stateLines: string[];
}

export class Config extends BaseConfig {
  override async config(args: ConfigArguments) {
    const [context, options] = await args.contextBuilder.get(args.denops);

    const plugins = PLUGINS.map((plugin) => {
      return {
        ...plugin,
        path: `${$XDG_DATA_HOME}/vim/plugins/${plugin.name}`,
      };
    });

    const state = await args.dpp.extAction(
      args.denops,
      context,
      options,
      "lazy",
      "makeState",
      { plugins },
    ) as LazyMakeStateResult;

    return {
      plugins: state.plugins,
      stateLines: state.stateLines,
    };
  }
}
