export type ExpressionValue = boolean | number | string | object | ( ( ...args: ExpressionValue[] ) => ExpressionValue ) | ExpressionValue[];
type ExpressionValueType = 'boolean' | 'number' | 'string' | 'array' | 'object' | 'function';

export class ExpressionType {

	protected _vtypes: string[];

	constructor(
		...args: ExpressionValueType[]
	) {
		this._vtypes = args.length ? args : [ 'boolean', 'number', 'string', 'array', 'object', 'function' ];
	}

	get exact(): boolean {
		return this._vtypes.length === 1;
	}

	get isArray(): boolean {
		return this.exact && this._vtypes[ 0 ] === 'array';
	}

	get isObject(): boolean {
		return this.exact && this._vtypes[ 0 ] === 'object';
	}

	get isFunction(): boolean {
		return this.exact && this._vtypes[ 0 ] === 'function';
	}

	infer( mask: ExpressionType, func = ( vtype: string, vmask: string ) => vtype === vmask ): ExpressionType | undefined {
		const vtypes = this._vtypes.filter( vtype => mask._vtypes.some( mvtype => func( vtype, mvtype ) ) ) as ExpressionValueType[];
		return vtypes.length ? new ExpressionType( ...vtypes ) : undefined;
	}

	toString(): string {
		return this._vtypes.join( '|' );
	}

	static of( value: ExpressionValue ): ExpressionType {
		const vtype = Array.isArray( value ) ? 'array' : typeof value;
		return new ExpressionType( vtype as ExpressionValueType );
	}

	static equate( value1: ExpressionValue, value2: ExpressionValue ): boolean {
		if ( typeof value1 === 'boolean' || typeof value1 === 'number' || typeof value1 === 'string' || typeof value1 === 'function' ) {
			return value1 === value2;
		}
		if ( Array.isArray( value1 ) && Array.isArray( value2 ) ) {
			if ( value1.length === value2.length ) {
				for ( let i = 0; i < value1.length; ++i ) {
					if ( !ExpressionType.equate( value1[ i ], value2[ i ] ) ) {
						return false;
					}
				}
				return true;
			}
			return false;
		}
		const props = new Set( [ ...Object.getOwnPropertyNames( value1 ), ...Object.getOwnPropertyNames( value2 ) ] );
		for ( const prop of props ) {
			if ( !ExpressionType.equate( ( value1 as any )[ prop ], ( value2 as any )[ prop ] ) ) {
				return false;
			}
		}
		return true;
	}

}

export const typeBoolean = new ExpressionType( 'boolean' );
export const typeNumber = new ExpressionType( 'number' );
export const typeString = new ExpressionType( 'string' );
export const typeArray = new ExpressionType( 'array' );
export const typeObject = new ExpressionType( 'object' );
export const typeFunction = new ExpressionType( 'function' );
export const typeVar = new ExpressionType();
