import { Node } from './Node.js';
import { ExpressionConstant } from './ExpressionConstant.js';
import { Type, Value } from './Type.js';

export class ExpressionConstantNode extends Node {

	constructor(
		_startPos: number,
		_endPos: number,
		protected _constant: ExpressionConstant,
	) {
		super(_startPos, _endPos);
	}

	override get type(): Type {
		return this._constant.type;
	}

	override toString(ident: number): string {
		return `${super.toString(ident)} constant node, type: ${this._constant.type.toString()}`;
	}

	override compile(type: Type): Node {
		if (!type.infer(this.type)) {
			this.throwTypeError(type);
		}
		return this;
	}

	override evaluate(): Value {
		return this._constant.value;
	}

}
