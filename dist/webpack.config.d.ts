import HtmlWebPackPlugin = require("html-webpack-plugin");
export const entry: string;
export namespace output {
    const filename: string;
    const path: string;
}
export const devtool: string;
export namespace resolve {
    const extensions: string[];
}
export namespace devServer {
    const hot: boolean;
    const port: number;
}
export namespace module {
    const rules: ({
        test: RegExp;
        use: {
            loader: string;
            options: {
                presets: string[];
            };
        };
    } | {
        test: RegExp;
        use: string[];
    })[];
}
export const plugins: HtmlWebPackPlugin[];
