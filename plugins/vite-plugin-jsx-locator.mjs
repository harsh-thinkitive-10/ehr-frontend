import { parse } from "@babel/parser";
import MagicString from "magic-string";

const ATTRIBUTE = "data-loc";
const JSX_FILE = /\.[jt]sx$/;

function walk(node, visit) {
  if (!node || typeof node !== "object") return;

  if (Array.isArray(node)) {
    for (const child of node) {
      walk(child, visit);
    }
    return;
  }

  if (typeof node.type === "string") {
    visit(node);
  }

  for (const key of Object.keys(node)) {
    if (key === "loc" || key === "tokens" || key === "comments") {
      continue;
    }

    walk(node[key], visit);
  }
}

function elementName(node) {
  const { name } = node;

  if (!name) return "";

  if (name.type === "JSXIdentifier") {
    return name.name;
  }

  if (name.type === "JSXMemberExpression") {
    return "member";
  }

  return "";
}

function alreadyStamped(node) {
  return node.attributes.some(
    (attribute) =>
      attribute.type === "JSXAttribute" &&
      attribute.name?.name === ATTRIBUTE,
  );
}

export function jsxLocator({ root }) {
  return {
    name: "jsx-locator",

    // Development server only.
    // Never runs during production build.
    apply: "serve",

    // Run before React transforms JSX.
    enforce: "pre",

    transform(code, id) {
      const [file] = id.split("?");

      // Only process JSX/TSX source files.
      if (
        !JSX_FILE.test(file) ||
        file.includes("/node_modules/") ||
        file.includes("\\node_modules\\")
      ) {
        return null;
      }

      let ast;

      try {
        ast = parse(code, {
          sourceType: "module",
          plugins: ["jsx", "typescript"],
          errorRecovery: true,
        });
      } catch {
        return null;
      }

      const source = new MagicString(code);

      const relative = file.startsWith(root)
        ? file.slice(root.length + 1)
        : file;

      let stamped = 0;

      walk(ast.program, (node) => {
        if (node.type !== "JSXOpeningElement") {
          return;
        }

        if (alreadyStamped(node)) {
          return;
        }

        if (!elementName(node)) {
          return;
        }

        const { line, column } = node.name.loc.start;

        source.appendLeft(
          node.name.end,
          ` ${ATTRIBUTE}="${relative}:${line}:${column + 1}"`,
        );

        stamped++;
      });

      if (stamped === 0) {
        return null;
      }

      return {
        code: source.toString(),
        map: source.generateMap({
          source: id,
          hires: true,
        }),
      };
    },
  };
}