# expression-evaluation
Evaluation of closed-form analytic expressions using recursive descent parser.

Parser supports boolean expressions, regular algebraic expressions,
 numeric, buffer, string array and object functions, variables, and closures.

Target: ES2022 [browser+NodeJS][ESM+CJS].

## Why

* Parse once, execute multiple times
* Efficient expression evaluation and basic type checking
* Support for boolean, number, buffer, string, array, object, function, void, variant
  and nullable types
* Boolean, arithmetic, buffer, string and index operators
* Numeric, buffer and string comparison operators
* Variadic functions and closures
* Input and statement variables
* Standard math functions
* Easy to add custom functions or constants
* All operators support literal equivalent

## What

#### Types
* boolean
* number
* buffer
* string
* array
* object
* function
* void type for **null** value
* optional type modifier **?** for boolean?, number?, buffer?, string?, array?, object?, function?
* unknown type **??**
#### Values
* **null**
* **true**
* **false**
#### Operators
* Assignment: **=**
* Grouping: **(...)**
* Next statement: **,**
* Array element at numeric value: **[]**
* Object property by string value: **{}**
* First valid array element: **[\*]**
* First valid object property: **{\*}**
* Boolean negation: **!**
* Boolean disjunction: **|**
* Boolean conjunction: **&**
* Greater than: **>**
* Less than: **<**
* Greater than or equals to: **>=**
* Less than or equals to: **<=**
* Equals to: **==**
* Not equals to: **!=**
* String similar to: **\~**
* String not similar to: **!\~**
* Null coalescence: **?:**
* Conditional statement: **if...then...else...**
* Arithmetic addition: **+**
* Arithmetic subtraction or negation: **-**
* Arithmetic multiplication: **\***
* Arithmetic division: **/**
* Arithmetic percentage: **%**
* Buffer, string, or array concatination: **+>**
* Method function call: **->**
#### Global Functions
* Boolean disjunction: **boolean or(boolean|array ...values)**
* Boolean conjunction: **boolean and(boolean|array ...values)**
* Bolean negation: **boolean not(boolean value)**
* Numeric sum: **number sum(number|array ...values)**
* Numeric minimum: **number min(number|array ...values)**
* Numeric maximum: **number max(number|array ...values)**
* New array filled with integers in between given two numbers: **array range(number inclusiveFrom, number exclusiveTo)**
* Chain array of any depths into single array: **array chain(array ...values)**
* Merge objects into single object: **object merge(array|object ...values)**
#### Base Method Functions
* Greater than: **boolean number->greaterThan(number value)**
* Less than: **boolean number->lessThan(number value)**
* Greater than or equals to: **boolean number->greaterOrEqual(number value)**
* Less than or equals to: **boolean number->lessOrEqual(number value)**
* Equals to: **boolean variant->equal(variant value)**
* Not equals to: **boolean variant->unequal(variant value)**
* String alphanumerically equals to: **boolean string->like(string value)**
* String alphanumerically not equals to: **boolean string->unlike(string value)**
* Null coalescence: **variant variant->coalesce(variant valueIfNull)**
* Conditional statement: **variant boolean->switch(variant valueIfTrue, variant valueIfFalse)**
* String contains substring: **boolean string->contains(string search, number? startPos, boolean? boolean? ignoreCaseSpaceEtc)**
* String starts with substring: **boolean string->startsWith(string search, number? startPos, boolean? ignoreCaseSpaceEtc)**
* String ends with substring: **boolean string->endsWith(string search, number? endPos, boolean? boolean? ignoreCaseSpaceEtc)**
* Check if every item satisfies condition: **boolean array->every(function condition)**
* Check if any item satisfies condition: **boolean array->any(function condition)**
* Get alphanumeric digest of string: **string string->alphanum()**
* Trim whitespace: **string string->trim()**
* Trim whitespace at start: **string string->trimStart()**
* Trim whitespace at end: **string string->trimEnd()**
* Lower case: **string string->lowerCase()**
* Upper case: **string string->upperCase()**
* Concatination of array of strings with separator: **string array->join(separator = ' ')**
* Array of unique values: **array array->unique()**
* Intersection of values of two arrays: **array array->intersection(array value)**
* Symmetrical difference between two arrays: **array array->difference(array value)**
#### Composite Method Functions
* Append buffer, string or array: **buffer|string|array buffer|string|array->append(buffer|string|array ...values)**
* Length of buffer, string, array or object: **number buffer|string|array|object->length()**
* New buffer, string or array slice: **buffer|string|array buffer|string|array->slice(number? beginIndex, number? endIndex)**
* Byte at position: **buffer buffer->byte(number pos)**
* Character at position: **string string->char(number pos)**
* Character code at position: **number string->charCode(number pos)**
* Find first item satisfying condition: **variant array->first(function condition)**
* Find last item satisfying condition: **variant array->last(function condition)**
* Find first index of item satisfying condition: **number array->firstIndex(function condition)**
* Find last index of item satisfying condition: **number array->lastIndex(function condition)**
* Array or object key-value pairs: **array array|object->entries()**
* Array or object keys: **array array|object->keys()**
* Array or object values: **array array|object->values()**
* Array or object value at index: **variant array|object->at(number|string index)**
* First valid value of array or object: **variant array|object->firstValid()**
* New array with reverse order of items: **array array->reverse()**
* New array flattened to specified depth: **array array->flatten(number depth)**
* Map items: **array array->map(function transformation)**
* Filter items: **array array->filter(function condition)**
* Iterate items: **array array->iterate(function iteration)**
* Reduce array to a single value: **variant array->reduce(function reducer)**
* Object composition from array of keys with generator function: **object array->compose(function generator)**
#### Math Method Functions
* Arithmetic addition: **number number->add(number ...values)**
* Arithmetic subtraction: **number number->subtract(number subtrahend)**
* Arithmetic negation: **number number->negate()**
* Arithmetic multiplication: **number number->multiply(number ...values)**
* Arithmetic division: **number number->divide(number divisor)**
* Arithmetic percentage: **number number->percentage(number divisor)**
* Exponent: **number number->exponent()**
* Logarithm: **number number->logarithm()**
* Power: **number number->power(number exponent)**
* Root: **number number->root(number index)**
* Square: **number number->square()**
* Square root: **number number->sqrt()**
* Absolute value: **number number->abs()**
* Ceil: **number number->ceil()**
* Floor: **number number->floor()**
* Rounded value: **number number->round()**
#### Mutation Method Functions
* Encode number: **buffer number->toNumberBuffer(string encoding)**
* Decode number: **number buffer->fromNumberBuffer(string encoding, number? offset)**
* Encode string: **buffer string->toStringBuffer(string encoding)**
* Decode string: **string buffer->fromStringBuffer(string? encoding, number? offset, number? length)**
* Create decimal string from number: **string number->toNumberString()**
* Parse number from decimal string: **buffer string->fromNumberString()**
* Create hexadecimal string from buffer: **string buffer->toBufferString()**
* Parse buffer from hexadecimal string: **buffer string->fromBufferString()**
* Parse object from JSON-formatted string: **void|boolean|number|string|array|object string|void->fromJson()**
* Create JSON-formatted string from object: **string|void void|boolean|number|string|array|object->toJson()**
#### Constants
* Not-a-number **NAN**
* Positive infinity **POSINF**
* Negative infinity **NEGINF**
* Epsilon **EPSILON**
* Pi **PI**

### Grammar
The expression parsing is performed using the following grammar:

	<program> = <disjunction>{ ","<disjunction> }
	<disjunction> = <conjunction>{ "|"<conjunction> }
	<conjunction> = <comparison>{ "&"<comparison> }
	<comparison> = { "!" }<aggregate>{ ( ">" | ">=" | "<" | "<=" | "=" | "!=" | "~" | "!~" )<aggregate> }
	<aggregate> = <product>{ ( "+>" | "+" | "-" )<product> }
	<product> = <factor>{ ( "*" | "/" | "%" )<factor> }
	<factor> = { "-" }<coalescence>{ "^"<coalescence> }
	<coalescence> = <accessor>{ "?:"<accessor> }
	<accessor> = <term>{ ( "->"<function> | "."<property-name-string> |
		"["<disjunction>"]" | "{"<disjunction>"}" ) }
	<term> = <literal> | <group> | <array> | <object> | <constant> | <variable> | <function> | <closure> |
		"if" <condition> "then" <disjunction> "else" <disjunction>
	<literal> = <decimal-number> | #<hexadecimal-number> | ##<hexadecimal-binary> | "<text-string>"
	<group> = "("<program>")"
	<array> = "["{ <disjunction> }{ ","<disjunction> }"]"
	<object> = "{"{ <property-name-string>:<disjunction> }{ ","<property-name-string>:<disjunction> }"}"
	<constant> = <constant-name-string>
	<variable> = { <type> } <variable-name-string>{ ":"<disjunction> }
	<function> = <function-name-string>"("{ <disjunction> }{ ","<disjunction> }")"
	<closure> = <type>"("{ <type> <argument-name-string> }{ ","<type> <argument-name-string> }")" <disjunction>
	<type> = ( "void" | "boolean" | "bool" | "number" | "num" | "buffer" | "buf" | "string" | "str" |
		"array" | "arr" | "object" | "obj" | "function" | "func" ){ "?" } | "variant" | "var"

Whitespace characters are ignored.

Expression may contain multiple comma separated sub-expressions.
The value of an expression is the value of the last sub-expression in the program.

Number scientific notation is supported.
Hexadecimal integer literals start with prefix **#**.
Hexadecimal buffer literals start with prefix **##**.

Array is an ordered sequence of values of any type.
It can be defined using brackets with comma separated elements inside.
Array element can be accessed using operator **@** with numeric literal or using accessor **[]** with numeric value.

Object is a container of named values of any type.
It can be defined using braces with comma separated properties with assigned values.
Object property can be accessed using operator **.** with string literal or using accessor **{}** with string value.

Function is a callable unit producing a value.
It is defined with a return type followed by a comma separated typed function argument list encased in parentheses,
 and a function expression encased in parentheses.

Type of any array is **array**.
Type of any object is **object**.
Type of any function is **function**.
Type of **null** is **void**.

Valid variable or function names consist of a letter, or **\_** characters followed by any combination
of alphanumeric characters, and **\_**. For example: *x*, *\_a1*, *abc25*


## How

Create instance of Expression class with a string containing expression and optional compilation configuration.
During the parsing any alphanumeric sequence not identified as
number value, string value, operator, or a function name is assumed to be variable.
Evaluate the expression by providing variable values.

Sample code:

```ts
...
const expr = new Expression( 'x * (y + abc / 5) > 10' );
const value1 = expr.evaluate( { x: 10, y: 20, abc: 10 } ); // true
const value2 = expr.evaluate( { x: 1, y: 4, abc: 5 } ); // false
...
const arrExpr = new Expression( 'sum([ 1, 2, 3, a, b, c ])' );
const valueSum = arrExpr.evaluate( { a: 10, b: 20, c: 30 } ); // 66
...
const objExpr = new Expression( '{prop1:a,prop2:`abc`}.prop1+10' );
const oValue = objExpr.evaluate( { a: 50 } ); // 60
...
const iteratorExpr = new Expression(
	'arr1->map(number(number a)(a*2))->filter(boolean(number a)(a>3))->sum()'
);
const iValue = iteratorExpr.evaluate( { arr1: [ 1, 2, 3 ] } ); // 10
...
const complexExpr = new Expression(
	'?? a=myvar1/10, var b=myvar2-100, a/b + b*a + 600'
);
const value = complexExpr.evaluate( { myvar1: 40, myvar2: 104 } ); // 4761
...
```
