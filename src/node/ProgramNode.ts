import { Node } from '../Node.js';
import { ParserFrame } from '../ParserFrame.js';
import { ConstantNode } from './ConstantNode.js';
import { Type, Value, typeUnknown } from '../Type.js';

export class ProgramNode extends Node {

	constructor(
		frame: ParserFrame,
		protected _subnodes: Node[],
	) {
		super(frame);
	}

	override get type(): Type {
		return this._subnodes[this._subnodes.length - 1].type;
	}

	override compile(type: Type): Node {
		for (let i = 0, last = this._subnodes.length - 1; i < this._subnodes.length; ++i) {
			this._subnodes[i] = this._subnodes[i].compile(i < last ? typeUnknown : type);
		}
		if (this._subnodes.every((node)=> node.constant)) {
			return new ConstantNode(this, this.evaluate());
		}
		return this;
	}

	override evaluate(): Value {
		return this._subnodes.map((s)=> s.evaluate())[this._subnodes.length - 1];
	}

	override toString(ident: number = 0): string {
		return `${super.toString(ident)} program node`
			+ `, subnodes:\n${this._subnodes.map((s)=> s.toString(ident + 1)).join('\n')}`;
	}

}
