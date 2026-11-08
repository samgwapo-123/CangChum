# Cangjie CodeChum-Style Question Bank --- Batch 2 (Lessons 11--20)

> Continuation of Batch 1 (Lessons 1--10). This batch follows the same
> problem format, difficulty distribution, input conventions, and
> test-case layout.

# Cangjie CodeChum-Style Question Bank

**This batch covers Lessons 11--20: 10 topics and 50 problems.** Each
topic has 5 problems: 2 Easy, 2 Medium, and 1 Hard. Every problem
includes a sample and at least five test cases. No solutions are
included.

------------------------------------------------------------------------

## Batch 2: Topics 11--20 (50 problems)

  \#   Topic                  \#   Topic
  ---- ---------------------- ---- --------------------------
  11   Strings and Runes      16   Hashmaps
  12   Strings                17   Hash Sets
  13   Enums                  18   Range Over Builtin Types
  14   Function Overloading   19   Iterators
  15   Match                  20   Variadic Functions

**Concepts covered:** String indexing and runes, string literals and
methods, enums, overloaded functions, match expressions and patterns,
hashmaps, hash sets, iterable collections, custom iterators, and
variadic functions.

------------------------------------------------------------------------

## Setup notes (please read once)

**Input is not taught until lesson 33.** As in Batch 1, stdin is setup
code rather than a topic being tested. Use the same input pattern from
Batch 1:

``` cangjie
import std.console.*
import std.convert.*

main() {
    let line = Console.stdIn.readln().getOrThrow()
    let n = Int64.parse(line)
    println(n)
}
```

For text input, keep the line as a `String`. For numeric input, convert
the line using the same parsing convention used in Batch 1.

**Important source and testing notes:** - Lessons 11--20 are the source
for the concepts in this batch. Earlier concepts such as variables,
functions, loops, and basic input/output may also be used. - For Lesson
11, the problems use ASCII input for byte-indexing tasks. This avoids
ambiguous byte-versus-Unicode indexing behavior. Rune-specific tasks use
explicitly stated single Rune values. - For Lessons 16--18, `HashMap`
and `HashSet` traversal order is not guaranteed. Problems therefore ask
for counts, membership results, or aggregate values rather than a
particular iteration order. - For Lesson 19, the source page's displayed
comments/output appear inconsistent with its iterator example. The
expected outputs below are based on each problem's stated behavior, not
copied from those comments. - For every problem, output must match the
stated capitalization, punctuation, spaces, and line breaks exactly. -
Every input value is on its own line. Test cases are written as `IN:`
and `OUT:` blocks. - No solution code is included.

------------------------------------------------------------------------

# TOPIC 11: Strings and Runes

## 11.1 String Length

**Difficulty:** Easy

**Description:** Read one ASCII word and print its length using the
string's `.size` property.

**Input Format:** One line containing a word.

**Output Format:** One integer: the number of characters in the word.

**Constraints:** The word contains 1 to 50 ASCII letters. It has no
spaces.

**Sample Input**

    Cangjie

**Sample Output**

    7

**Test Cases**

    # T1 (normal)
    IN:
    hello
    OUT:
    5

    # T2 (one character)
    IN:
    A
    OUT:
    1

    # T3 (maximum length)
    IN:
    ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwx
    OUT:
    50

    # T4 (all lowercase)
    IN:
    programming
    OUT:
    11

    # T5 (digits are not allowed by the constraints, mixed letters)
    IN:
    CodeChum
    OUT:
    8

**Concepts Practiced:** `String`, `.size`, reading a line, printing an
integer.

------------------------------------------------------------------------

## 11.2 Character at an Index

**Difficulty:** Easy

**Description:** Read an ASCII word and an index. Print the character at
that zero-based index. The index is always valid.

**Input Format:** Two lines: the word, then the zero-based index.

**Output Format:** One line containing the character at the requested
index.

**Constraints:** The word contains 1 to 50 ASCII letters.
`0 ≤ index < word length`.

**Sample Input**

    Cangjie
    2

**Sample Output**

    n

**Test Cases**

    # T1 (first character)
    IN:
    hello
    0
    OUT:
    h

    # T2 (last character)
    IN:
    hello
    4
    OUT:
    o

    # T3 (middle character)
    IN:
    computer
    3
    OUT:
    p

    # T4 (single character)
    IN:
    Z
    0
    OUT:
    Z

    # T5 (mixed case)
    IN:
    CodeChum
    4
    OUT:
    C

**Concepts Practiced:** String indexing with `[]`, zero-based indexes,
`String.size`.

------------------------------------------------------------------------

## 11.3 Rune Code Report

**Difficulty:** Medium

**Description:** Read one ASCII letter. Convert the selected character
to a `Rune` and print the character and its numeric code value. The
input is guaranteed to contain exactly one ASCII letter. Use the Rune
conversion behavior taught in the lesson.

**Input Format:** One line containing one ASCII letter.

**Output Format:** Two lines:

    Character: <character>
    Rune: <numeric code>

**Constraints:** The input contains exactly one character from `A` to
`Z` or `a` to `z`.

**Sample Input**

    A

**Sample Output**

    Character: A
    Rune: 65

**Test Cases**

    # T1 (uppercase A)
    IN:
    A
    OUT:
    Character: A
    Rune: 65

    # T2 (uppercase Z)
    IN:
    Z
    OUT:
    Character: Z
    Rune: 90

    # T3 (lowercase a)
    IN:
    a
    OUT:
    Character: a
    Rune: 97

    # T4 (lowercase z)
    IN:
    z
    OUT:
    Character: z
    Rune: 122

    # T5 (middle letter)
    IN:
    M
    OUT:
    Character: M
    Rune: 77

**Concepts Practiced:** `Rune`, Rune conversion, ASCII character codes,
string indexing.

------------------------------------------------------------------------

## 11.4 Count a Selected Character

**Difficulty:** Medium

**Description:** Read an ASCII word and a target character. Count how
many times the target character appears in the word. Compare characters
exactly, so uppercase and lowercase are different.

**Input Format:** Two lines: the word, then the target character.

**Output Format:** One integer: the number of occurrences.

**Constraints:** The word contains 1 to 100 ASCII letters. The target
line contains exactly one ASCII letter.

**Sample Input**

    banana
    a

**Sample Output**

    3

**Test Cases**

    # T1 (several matches)
    IN:
    mississippi
    s
    OUT:
    4

    # T2 (no match)
    IN:
    computer
    z
    OUT:
    0

    # T3 (case-sensitive)
    IN:
    Banana
    a
    OUT:
    3

    # T4 (every character matches)
    IN:
    aaaaa
    a
    OUT:
    5

    # T5 (one-character word)
    IN:
    x
    x
    OUT:
    1

**Concepts Practiced:** String indexing, iteration over string elements,
character comparison, counting.

------------------------------------------------------------------------

## 11.5 ASCII Character Frequency

**Difficulty:** Hard

**Description:** Read a word and three target ASCII letters. Count the
occurrences of each target separately. A character may appear more than
once among the targets; report each requested count in the original
target order. Comparisons are case-sensitive.

**Input Format:** Four lines: the word, target 1, target 2, and target
3. Each target line contains one ASCII letter.

**Output Format:** Three lines:

    <target 1>: <count>
    <target 2>: <count>
    <target 3>: <count>

**Constraints:** The word contains 1 to 100 ASCII letters. Each target
is one ASCII letter.

**Sample Input**

    Mississippi
    s
    i
    p

**Sample Output**

    s: 4
    i: 4
    p: 2

**Test Cases**

    # T1 (three different targets)
    IN:
    programming
    m
    g
    r
    OUT:
    m: 2
    g: 2
    r: 2

    # T2 (repeated target)
    IN:
    banana
    a
    a
    n
    OUT:
    a: 3
    a: 3
    n: 2

    # T3 (case-sensitive targets)
    IN:
    AaAa
    A
    a
    B
    OUT:
    A: 2
    a: 2
    B: 0

    # T4 (all targets absent)
    IN:
    hello
    x
    y
    z
    OUT:
    x: 0
    y: 0
    z: 0

    # T5 (single-character word)
    IN:
    Q
    Q
    q
    Q
    OUT:
    Q: 1
    q: 0
    Q: 1

**Concepts Practiced:** String iteration, `Rune` or character
comparisons, multiple counters, preserving requested output order.

------------------------------------------------------------------------

# TOPIC 12: Strings

## 12.1 Trim a Line

**Difficulty:** Easy

**Description:** Read one line that may contain spaces at the beginning
or end. Print the line after removing leading and trailing whitespace
using the string trimming method taught in the lesson.

**Input Format:** One line of text. It contains at least one non-space
character.

**Output Format:** The trimmed text on one line.

**Constraints:** The line contains 1 to 60 printable ASCII characters
and at least one non-space character.

**Sample Input**

       Cangjie   

**Sample Output**

    Cangjie

**Test Cases**

    # T1 (spaces on both sides)
    IN:
       hello world   
    OUT:
    hello world

    # T2 (leading spaces only)
    IN:
        code
    OUT:
    code

    # T3 (trailing spaces only)
    IN:
    school    
    OUT:
    school

    # T4 (no extra spaces)
    IN:
    Cebu
    OUT:
    Cebu

    # T5 (internal spaces must remain)
    IN:
      Code  Chum  
    OUT:
    Code  Chum

**Concepts Practiced:** `String`, `.trimLeft` and the lesson's trimming
behavior, preserving internal spaces.

------------------------------------------------------------------------

## 12.2 Change Letter Case

**Difficulty:** Easy

**Description:** Read one line of ASCII text. Print the text in
uppercase, then in lowercase.

**Input Format:** One line containing ASCII letters and spaces.

**Output Format:** Two lines:

    Upper: <uppercase text>
    Lower: <lowercase text>

**Constraints:** The line contains 1 to 80 characters. It may contain
spaces. It has no leading or trailing spaces.

**Sample Input**

    Hello Cangjie

**Sample Output**

    Upper: HELLO CANGJIE
    Lower: hello cangjie

**Test Cases**

    # T1 (mixed case)
    IN:
    CodeChum
    OUT:
    Upper: CODECHUM
    Lower: codechum

    # T2 (already uppercase)
    IN:
    PROGRAMMING
    OUT:
    Upper: PROGRAMMING
    Lower: programming

    # T3 (already lowercase)
    IN:
    student
    OUT:
    Upper: STUDENT
    Lower: student

    # T4 (multiple words)
    IN:
    Hello World 2026
    OUT:
    Upper: HELLO WORLD 2026
    Lower: hello world 2026

    # T5 (single letter)
    IN:
    z
    OUT:
    Upper: Z
    Lower: z

**Concepts Practiced:** `.toAsciiUpper`, `.toAsciiLower`, string output.

------------------------------------------------------------------------

## 12.3 Replace a Word

**Difficulty:** Medium

**Description:** Read a sentence, a target substring, and a replacement
substring. Replace every occurrence of the target substring using the
string replacement method taught in the lesson.

**Input Format:** Three lines: sentence, target substring, replacement
substring.

**Output Format:** One line containing the resulting sentence.

**Constraints:** The sentence contains 1 to 100 ASCII characters. The
target and replacement each contain 1 to 20 characters. The target
appears at least once.

**Sample Input**

    I like cats
    cats
    dogs

**Sample Output**

    I like dogs

**Test Cases**

    # T1 (one occurrence)
    IN:
    red blue red
    red
    green
    OUT:
    green blue green

    # T2 (replace a short substring)
    IN:
    banana
    na
    X
    OUT:
    baXX

    # T3 (replacement is longer)
    IN:
    I use C
    C
    Cangjie
    OUT:
    I use Cangjie

    # T4 (replace with same text)
    IN:
    hello hello
    hello
    hello
    OUT:
    hello hello

    # T5 (replace one letter)
    IN:
    mississippi
    s
    S
    OUT:
    miSSiSSippi

**Concepts Practiced:** `.replace`, string arguments, exact substring
replacement.

------------------------------------------------------------------------

## 12.4 Split and Join Words

**Difficulty:** Medium

**Description:** Read a sentence containing words separated by one or
more spaces. Split the sentence into words and join them using a hyphen
(`-`). The input is guaranteed to have no leading or trailing spaces.

**Input Format:** One line containing the sentence.

**Output Format:** One line containing the words joined by hyphens.

**Constraints:** The sentence contains 1 to 100 ASCII characters and 1
to 10 words.

**Sample Input**

    learn Cangjie today

**Sample Output**

    learn-Cangjie-today

**Test Cases**

    # T1 (three words)
    IN:
    I love code
    OUT:
    I-love-code

    # T2 (one word)
    IN:
    Cangjie
    OUT:
    Cangjie

    # T3 (four words)
    IN:
    practice every single day
    OUT:
    practice-every-single-day

    # T4 (multiple spaces)
    IN:
    one  two   three
    OUT:
    one-two-three

    # T5 (short words)
    IN:
    a b c d
    OUT:
    a-b-c-d

**Concepts Practiced:** `.split`, `String.join`, string collections,
joining with a separator.

------------------------------------------------------------------------

## 12.5 Text Inspection Report

**Difficulty:** Hard

**Description:** Read a line of text and a search word. Print whether
the line contains the search word, whether it starts with the search
word, whether it ends with the search word, whether it is empty after
trimming, and the original string length. All string checks are
case-sensitive. The search word is non-empty.

**Input Format:** Two lines: the text, then the search word. The text
may be empty.

**Output Format:** Five lines:

    Contains: <true/false>
    Starts with: <true/false>
    Ends with: <true/false>
    Empty: <true/false>
    Size: <number>

**Constraints:** Text length is 0 to 100 ASCII characters. Search word
length is 1 to 20 ASCII characters.

**Sample Input**

    Cangjie programming
    Cangjie

**Sample Output**

    Contains: true
    Starts with: true
    Ends with: false
    Empty: false
    Size: 19

**Test Cases**

    # T1 (all positional checks)
    IN:
    hello world
    hello
    OUT:
    Contains: true
    Starts with: true
    Ends with: false
    Empty: false
    Size: 11

    # T2 (ends with search word)
    IN:
    learn Cangjie
    Cangjie
    OUT:
    Contains: true
    Starts with: false
    Ends with: true
    Empty: false
    Size: 13

    # T3 (search word absent)
    IN:
    computer science
    math
    OUT:
    Contains: false
    Starts with: false
    Ends with: false
    Empty: false
    Size: 16

    # T4 (empty text)
    IN:

    x
    OUT:
    Contains: false
    Starts with: false
    Ends with: false
    Empty: true
    Size: 0

    # T5 (case-sensitive)
    IN:
    Hello
    hello
    OUT:
    Contains: false
    Starts with: false
    Ends with: false
    Empty: false
    Size: 5

**Concepts Practiced:** `.contains`, `.startsWith`, `.endsWith`,
`.trimLeft` or trimming, `.isEmpty`, `.size`.

------------------------------------------------------------------------

# TOPIC 13: Enums

## 13.1 Traffic Light

**Difficulty:** Easy

**Description:** Define an enum named `TrafficLight` with the cases
`Red`, `Yellow`, and `Green`. Read a color name and use a match
expression to print the instruction associated with it.

**Input Format:** One line: `Red`, `Yellow`, or `Green`.

**Output Format:** One line: - `Red` → `Stop` - `Yellow` → `Wait` -
`Green` → `Go`

**Constraints:** Input is exactly one of the three listed values.

**Sample Input**

    Red

**Sample Output**

    Stop

**Test Cases**

    # T1
    IN:
    Red
    OUT:
    Stop

    # T2
    IN:
    Yellow
    OUT:
    Wait

    # T3
    IN:
    Green
    OUT:
    Go

    # T4
    IN:
    Red
    OUT:
    Stop

    # T5
    IN:
    Green
    OUT:
    Go

**Concepts Practiced:** Enum declaration, enum cases, `match`,
exhaustive case handling.

------------------------------------------------------------------------

## 13.2 Day Type

**Difficulty:** Easy

**Description:** Define an enum named `DayType` with cases `Weekday` and
`Weekend`. Read a day number from 1 to 7. Map 1--5 to `Weekday` and 6--7
to `Weekend`, then match the enum and print the result.

**Input Format:** One integer from 1 to 7.

**Output Format:** One line: `Weekday` or `Weekend`.

**Constraints:** `1 ≤ day ≤ 7`.

**Sample Input**

    6

**Sample Output**

    Weekend

**Test Cases**

    # T1 (Monday)
    IN:
    1
    OUT:
    Weekday

    # T2 (Friday)
    IN:
    5
    OUT:
    Weekday

    # T3 (Saturday)
    IN:
    6
    OUT:
    Weekend

    # T4 (Sunday)
    IN:
    7
    OUT:
    Weekend

    # T5 (Wednesday)
    IN:
    3
    OUT:
    Weekday

**Concepts Practiced:** Enum values, mapping input to enum cases,
`match`.

------------------------------------------------------------------------

## 13.3 Operation Enum

**Difficulty:** Medium

**Description:** Define an enum named `Operation` with four cases:
`Add`, `Subtract`, `Multiply`, and `Divide`. Read an operation name and
two integers. Match the operation and calculate the result. Division
uses integer division. The divisor is never zero.

**Input Format:** Three lines: operation name, integer `a`, integer `b`.

**Output Format:** One line containing the integer result.

**Constraints:** `-10000 ≤ a, b ≤ 10000`; `b` is nonzero for `Divide`.
Operation is one of the four listed names.

**Sample Input**

    Multiply
    6
    7

**Sample Output**

    42

**Test Cases**

    # T1 (addition)
    IN:
    Add
    12
    8
    OUT:
    20

    # T2 (subtraction)
    IN:
    Subtract
    5
    9
    OUT:
    -4

    # T3 (multiplication)
    IN:
    Multiply
    -3
    4
    OUT:
    -12

    # T4 (exact division)
    IN:
    Divide
    20
    5
    OUT:
    4

    # T5 (integer division)
    IN:
    Divide
    17
    5
    OUT:
    3

**Concepts Practiced:** Enum constructors, matching enum cases,
arithmetic, exhaustive matching.

------------------------------------------------------------------------

## 13.4 Recursive Expression Evaluator

**Difficulty:** Medium

**Description:** Define a recursive enum named `Expr` with a number case
and two binary cases: addition and subtraction. Read three integers `a`,
`b`, and `c`. Build the expression `(a + b) - c` using the enum
constructors and evaluate it with a recursive function named `evalExpr`.

**Input Format:** Three integers, one per line: `a`, `b`, and `c`.

**Output Format:** One integer: the result of `(a + b) - c`.

**Constraints:** `-100000 ≤ a, b, c ≤ 100000`.

**Sample Input**

    10
    5
    3

**Sample Output**

    12

**Test Cases**

    # T1 (positive values)
    IN:
    10
    5
    3
    OUT:
    12

    # T2 (negative result)
    IN:
    2
    3
    10
    OUT:
    -5

    # T3 (negative operands)
    IN:
    -5
    -2
    -3
    OUT:
    -4

    # T4 (zeros)
    IN:
    0
    0
    0
    OUT:
    0

    # T5 (mixed signs)
    IN:
    100
    -40
    20
    OUT:
    40

**Concepts Practiced:** Recursive enums, enum constructors with
associated values, recursive matching, functions.

------------------------------------------------------------------------

## 13.5 Color Channel Enum

**Difficulty:** Hard

**Description:** Define an enum named `ColorChannel` with three cases
that each carry an integer value: `Red(Int64)`, `Green(Int64)`, and
`Blue(Int64)`. Read three channel values and a channel name. Construct
the matching enum case and use a match expression to print the selected
channel value and its label.

**Input Format:** Four lines: red value, green value, blue value, then
channel name (`Red`, `Green`, or `Blue`).

**Output Format:** Two lines:

    Channel: <name>
    Value: <selected value>

**Constraints:** Each channel value is from 0 to 255. Channel name is
exactly one of the three listed values.

**Sample Input**

    120
    80
    200
    Blue

**Sample Output**

    Channel: Blue
    Value: 200

**Test Cases**

    # T1 (Red)
    IN:
    255
    0
    0
    Red
    OUT:
    Channel: Red
    Value: 255

    # T2 (Green)
    IN:
    10
    128
    20
    Green
    OUT:
    Channel: Green
    Value: 128

    # T3 (Blue)
    IN:
    1
    2
    3
    Blue
    OUT:
    Channel: Blue
    Value: 3

    # T4 (minimum values)
    IN:
    0
    0
    0
    Green
    OUT:
    Channel: Green
    Value: 0

    # T5 (maximum values)
    IN:
    255
    255
    255
    Red
    OUT:
    Channel: Red
    Value: 255

**Concepts Practiced:** Enum constructors with associated values,
constructing enum cases, matching and binding associated values.

------------------------------------------------------------------------

# TOPIC 14: Function Overloading

*For this topic, define the overloaded functions with the same names and
the parameter types/counts stated. Call the correct overload from
`main`. The tests check printed output.*

## 14.1 Double an Integer

**Difficulty:** Easy

**Description:** Define `func doubleValue(n: Int64): Int64` that returns
twice the input. Read one integer, call the function, and print the
result.

**Input Format:** One integer.

**Output Format:** One integer: twice the input.

**Constraints:** `-1000000 ≤ n ≤ 1000000`.

**Sample Input**

    12

**Sample Output**

    24

**Test Cases**

    # T1 (positive)
    IN:
    12
    OUT:
    24

    # T2 (zero)
    IN:
    0
    OUT:
    0

    # T3 (negative)
    IN:
    -7
    OUT:
    -14

    # T4 (one)
    IN:
    1
    OUT:
    2

    # T5 (large negative)
    IN:
    -1000000
    OUT:
    -2000000

**Concepts Practiced:** Function definition, typed parameters, return
values, function calls.

------------------------------------------------------------------------

## 14.2 Combine Two Values

**Difficulty:** Easy

**Description:** Define two overloads named `combine`: -
`combine(a: Int64, b: Int64): Int64` returns the sum. -
`combine(a: String, b: String): String` returns the two strings joined
directly, with no separator.

Read two integers and print the integer overload's result. Then read two
words and print the string overload's result.

**Input Format:** Four lines: integer `a`, integer `b`, string `first`,
string `second`.

**Output Format:** Two lines: the integer sum, then the concatenated
string.

**Constraints:** Integers are from -100000 to 100000. Each word contains
1 to 20 ASCII letters.

**Sample Input**

    4
    6
    Code
    Chum

**Sample Output**

    10
    CodeChum

**Test Cases**

    # T1
    IN:
    1
    2
    Hello
    World
    OUT:
    3
    HelloWorld

    # T2 (zero values)
    IN:
    0
    0
    A
    B
    OUT:
    0
    AB

    # T3 (negative integers)
    IN:
    -5
    3
    Cang
    Jie
    OUT:
    -2
    CangJie

    # T4 (same words)
    IN:
    10
    10
    same
    same
    OUT:
    20
    samesame

    # T5 (longer words)
    IN:
    100
    200
    Programming
    Language
    OUT:
    300
    ProgrammingLanguage

**Concepts Practiced:** Function overloading by parameter type, `Int64`
and `String` parameters.

------------------------------------------------------------------------

## 14.3 Three Ways to Calculate

**Difficulty:** Medium

**Description:** Define three overloads named `calculate`: - One `Int64`
parameter returns its square. - Two `Int64` parameters return their
sum. - Three `Int64` parameters return their product.

Read four integers: `mode`, `a`, `b`, and `c`. If mode is 1, call the
one-parameter overload with `a`. If mode is 2, call the two-parameter
overload with `a` and `b`. If mode is 3, call the three-parameter
overload with `a`, `b`, and `c`.

**Input Format:** Four integers, one per line.

**Output Format:** One integer: the selected overload's result.

**Constraints:** `mode` is 1, 2, or 3. `-100 ≤ a, b, c ≤ 100`.

**Sample Input**

    3
    2
    3
    4

**Sample Output**

    24

**Test Cases**

    # T1 (one parameter)
    IN:
    1
    5
    2
    3
    OUT:
    25

    # T2 (two parameters)
    IN:
    2
    5
    7
    3
    OUT:
    12

    # T3 (three parameters)
    IN:
    3
    2
    3
    4
    OUT:
    24

    # T4 (negative values)
    IN:
    3
    -2
    3
    4
    OUT:
    -24

    # T5 (zero product)
    IN:
    3
    10
    0
    5
    OUT:
    0

**Concepts Practiced:** Overloading by parameter count, selecting an
overload, function calls.

------------------------------------------------------------------------

## 14.4 Sum a Variable Number of Values

**Difficulty:** Medium

**Description:** Define `func sum(values: Array<Int64>): Int64` and use
the lesson's variadic-argument calling behavior to pass individual
integer arguments to it. Read four integers and call `sum` with those
four values.

**Input Format:** Four integers, one per line.

**Output Format:** One integer: their sum.

**Constraints:** `-100000 ≤ each value ≤ 100000`.

**Sample Input**

    1
    2
    3
    4

**Sample Output**

    10

**Test Cases**

    # T1 (positive values)
    IN:
    5
    10
    15
    20
    OUT:
    50

    # T2 (all zeros)
    IN:
    0
    0
    0
    0
    OUT:
    0

    # T3 (negative values)
    IN:
    -1
    -2
    -3
    -4
    OUT:
    -10

    # T4 (mixed values)
    IN:
    10
    -5
    3
    -2
    OUT:
    6

    # T5 (same values)
    IN:
    7
    7
    7
    7
    OUT:
    28

**Concepts Practiced:** Array parameter, variadic function calls,
summing an array.

------------------------------------------------------------------------

## 14.5 Overloaded Area Calculator

**Difficulty:** Hard

**Description:** Define two overloads named `area`: -
`area(side: Int64): Int64` returns the area of a square. -
`area(width: Int64, height: Int64): Int64` returns the area of a
rectangle.

Read a mode. If mode is 1, read one side and call the one-parameter
overload. If mode is 2, read width and height and call the two-parameter
overload.

**Input Format:** First line is mode. For mode 1, the next line is side.
For mode 2, the next two lines are width and height.

**Output Format:** One integer: the calculated area.

**Constraints:** Mode is 1 or 2. All dimensions are from 0 to 10000.

**Sample Input**

    2
    5
    8

**Sample Output**

    40

**Test Cases**

    # T1 (square)
    IN:
    1
    5
    OUT:
    25

    # T2 (rectangle)
    IN:
    2
    5
    8
    OUT:
    40

    # T3 (zero side)
    IN:
    1
    0
    OUT:
    0

    # T4 (long rectangle)
    IN:
    2
    100
    3
    OUT:
    300

    # T5 (maximum square)
    IN:
    1
    10000
    OUT:
    100000000

**Concepts Practiced:** Function overloading by parameter count,
overload resolution, typed parameters and return values.

------------------------------------------------------------------------

# TOPIC 15: Match

## 15.1 Number Category

**Difficulty:** Easy

**Description:** Read an integer and use a match expression to classify
it as `Negative`, `Zero`, or `Positive`.

**Input Format:** One integer.

**Output Format:** One word: `Negative`, `Zero`, or `Positive`.

**Constraints:** `-1000000 ≤ n ≤ 1000000`.

**Sample Input**

    0

**Sample Output**

    Zero

**Test Cases**

    # T1 (negative)
    IN:
    -8
    OUT:
    Negative

    # T2 (zero)
    IN:
    0
    OUT:
    Zero

    # T3 (positive)
    IN:
    9
    OUT:
    Positive

    # T4 (minimum)
    IN:
    -1000000
    OUT:
    Negative

    # T5 (maximum)
    IN:
    1000000
    OUT:
    Positive

**Concepts Practiced:** `match`, literal patterns, wildcard pattern,
expression result.

------------------------------------------------------------------------

## 15.2 Grade Band

**Difficulty:** Easy

**Description:** Read a score from 0 to 100 and use match patterns to
print its grade band: - 90--100: `A` - 80--89: `B` - 70--79: `C` -
60--69: `D` - 0--59: `F`

**Input Format:** One integer score.

**Output Format:** One uppercase letter.

**Constraints:** `0 ≤ score ≤ 100`.

**Sample Input**

    85

**Sample Output**

    B

**Test Cases**

    # T1 (top band)
    IN:
    100
    OUT:
    A

    # T2 (boundary 90)
    IN:
    90
    OUT:
    A

    # T3 (boundary 80)
    IN:
    80
    OUT:
    B

    # T4 (boundary 60)
    IN:
    60
    OUT:
    D

    # T5 (lowest score)
    IN:
    0
    OUT:
    F

**Concepts Practiced:** Match range patterns, multiple cases, matching
an integer.

------------------------------------------------------------------------

## 15.3 Tuple Command

**Difficulty:** Medium

**Description:** Read a command and two integers. Match the tuple
`(command, a, b)` and perform the requested operation. Supported
commands are `ADD`, `SUB`, and `MUL`. Use a wildcard fallback for any
other command and print `Invalid`.

**Input Format:** Three lines: command, integer `a`, integer `b`.

**Output Format:** One line containing the result, or `Invalid`.

**Constraints:** `-10000 ≤ a, b ≤ 10000`. Command is uppercase ASCII
text.

**Sample Input**

    ADD
    4
    5

**Sample Output**

    9

**Test Cases**

    # T1 (addition)
    IN:
    ADD
    10
    20
    OUT:
    30

    # T2 (subtraction)
    IN:
    SUB
    4
    9
    OUT:
    -5

    # T3 (multiplication)
    IN:
    MUL
    -3
    5
    OUT:
    -15

    # T4 (unknown command)
    IN:
    DIV
    10
    2
    OUT:
    Invalid

    # T5 (zero)
    IN:
    MUL
    0
    100
    OUT:
    0

**Concepts Practiced:** Tuple patterns, matching multiple values
together, wildcard patterns.

------------------------------------------------------------------------

## 15.4 Match a Pair of Values

**Difficulty:** Medium

**Description:** Read two integers and match their relationship. Print
`Both zero` if both are zero, `First zero` if only the first is zero,
`Second zero` if only the second is zero, `Equal` if they are equal and
nonzero, or `Different` otherwise. Use tuple patterns and guards or
equivalent match conditions supported by the lesson.

**Input Format:** Two integers, one per line.

**Output Format:** One of the five messages.

**Constraints:** `-100000 ≤ a, b ≤ 100000`.

**Sample Input**

    0
    5

**Sample Output**

    First zero

**Test Cases**

    # T1 (both zero)
    IN:
    0
    0
    OUT:
    Both zero

    # T2 (first zero)
    IN:
    0
    7
    OUT:
    First zero

    # T3 (second zero)
    IN:
    9
    0
    OUT:
    Second zero

    # T4 (equal nonzero)
    IN:
    -4
    -4
    OUT:
    Equal

    # T5 (different nonzero)
    IN:
    3
    8
    OUT:
    Different

**Concepts Practiced:** Tuple matching, pattern ordering, guards or
conditional matching.

------------------------------------------------------------------------

## 15.5 Match-Based Shipping Cost

**Difficulty:** Hard

**Description:** Read a shipping zone and package weight. Use match to
choose the base charge: - `LOCAL`: 40 - `NEAR`: 70 - `FAR`: 120

Then add a weight charge: - Weight from 1 to 2 kg: add 0 - Weight
greater than 2 and up to 5 kg: add 30 - Weight greater than 5 and up to
10 kg: add 60

If the zone or weight is invalid, print `Invalid`. Weight is given as an
integer number of kilograms.

**Input Format:** Two lines: zone, then weight.

**Output Format:** One line: `Shipping: <total>` or `Invalid`.

**Constraints:** Zone is one of `LOCAL`, `NEAR`, `FAR`, or another
uppercase word. Weight is an integer.

**Sample Input**

    NEAR
    4

**Sample Output**

    Shipping: 100

**Test Cases**

    # T1 (local, minimum weight)
    IN:
    LOCAL
    1
    OUT:
    Shipping: 40

    # T2 (near, middle weight)
    IN:
    NEAR
    3
    OUT:
    Shipping: 100

    # T3 (far, maximum weight)
    IN:
    FAR
    10
    OUT:
    Shipping: 180

    # T4 (invalid weight)
    IN:
    LOCAL
    0
    OUT:
    Invalid

    # T5 (invalid zone)
    IN:
    ISLAND
    5
    OUT:
    Invalid

**Concepts Practiced:** Match expressions, string and range patterns,
wildcard fallback, combining matched values with arithmetic.

------------------------------------------------------------------------

# TOPIC 16: Hashmaps

*HashMap iteration order is not guaranteed. These problems never require
printing entries in a particular traversal order.*

## 16.1 Store and Retrieve a Score

**Difficulty:** Easy

**Description:** Create a `HashMap<String, Int64>`. Read a student's
name and score, store the score using the name as the key, then read a
name to search for. Print the stored score if the key exists; otherwise
print `Not found`.

**Input Format:** Three lines: stored name, score, search name.

**Output Format:** One line: the score or `Not found`.

**Constraints:** Names contain 1 to 30 ASCII letters. `0 ≤ score ≤ 100`.

**Sample Input**

    Ana
    95
    Ana

**Sample Output**

    95

**Test Cases**

    # T1 (key exists)
    IN:
    Ben
    88
    Ben
    OUT:
    88

    # T2 (key missing)
    IN:
    Ana
    95
    Luis
    OUT:
    Not found

    # T3 (zero score)
    IN:
    Mia
    0
    Mia
    OUT:
    0

    # T4 (maximum score)
    IN:
    Kai
    100
    Kai
    OUT:
    100

    # T5 (different capitalization)
    IN:
    Sam
    75
    sam
    OUT:
    Not found

**Concepts Practiced:** `HashMap`, key-value pairs, insertion, key
lookup.

------------------------------------------------------------------------

## 16.2 Count Stored Entries

**Difficulty:** Easy

**Description:** Create a `HashMap<String, Int64>`. Read three key-value
pairs and insert them into the map. Print the map's size. All three keys
are guaranteed to be different.

**Input Format:** Six lines: key 1, value 1, key 2, value 2, key 3,
value 3.

**Output Format:** One integer: the number of entries.

**Constraints:** Keys are 1 to 20 ASCII letters. Values are integers
from -1000 to 1000. Keys are distinct.

**Sample Input**

    apple
    5
    banana
    7
    cherry
    9

**Sample Output**

    3

**Test Cases**

    # T1
    IN:
    A
    1
    B
    2
    C
    3
    OUT:
    3

    # T2 (negative values)
    IN:
    red
    -1
    green
    -2
    blue
    -3
    OUT:
    3

    # T3 (single-letter keys)
    IN:
    x
    0
    y
    0
    z
    0
    OUT:
    3

    # T4 (longer keys)
    IN:
    student
    90
    teacher
    95
    principal
    100
    OUT:
    3

    # T5 (different case is a different key)
    IN:
    Code
    1
    code
    2
    CODE
    3
    OUT:
    3

**Concepts Practiced:** `HashMap`, `put`, `.size`, unique keys.

------------------------------------------------------------------------

## 16.3 Update Inventory Quantities

**Difficulty:** Medium

**Description:** Create a `HashMap<String, Int64>` with three product
quantities. Read a product name and a new quantity. Update the value for
that key, then print the quantities for the three original product names
in the original input order. The update key is guaranteed to be one of
the three products.

**Input Format:** Seven lines: three product-name/quantity pairs, then
update product name, then new quantity.

**Output Format:** Three lines, one per original product:

    <product>: <quantity>

**Constraints:** Product names are distinct ASCII words. Quantities are
from 0 to 10000.

**Sample Input**

    Pen
    10
    Book
    5
    Bag
    2
    Book
    8

**Sample Output**

    Pen: 10
    Book: 8
    Bag: 2

**Test Cases**

    # T1 (update first)
    IN:
    Pen
    10
    Book
    5
    Bag
    2
    Pen
    7
    OUT:
    Pen: 7
    Book: 5
    Bag: 2

    # T2 (update middle)
    IN:
    Pen
    10
    Book
    5
    Bag
    2
    Book
    8
    OUT:
    Pen: 10
    Book: 8
    Bag: 2

    # T3 (update last)
    IN:
    Pen
    10
    Book
    5
    Bag
    2
    Bag
    0
    OUT:
    Pen: 10
    Book: 5
    Bag: 0

    # T4 (increase quantity)
    IN:
    Rice
    1
    Milk
    2
    Egg
    3
    Egg
    100
    OUT:
    Rice: 1
    Milk: 2
    Egg: 100

    # T5 (set quantity to same value)
    IN:
    A
    4
    B
    5
    C
    6
    B
    5
    OUT:
    A: 4
    B: 5
    C: 6

**Concepts Practiced:** `HashMap.put`, updating a value, indexing by
key, deterministic lookup output.

------------------------------------------------------------------------

## 16.4 Remove a Product

**Difficulty:** Medium

**Description:** Create a map with three product names and their
quantities. Read one product name to remove. Remove that key and print
the remaining map size, followed by whether the removed key is still
present.

**Input Format:** Seven lines: three product-name/quantity pairs, then
the product name to remove.

**Output Format:** Two lines:

    Size: <number>
    Contains removed key: <true/false>

**Constraints:** The three product names are distinct. The removal key
is guaranteed to exist.

**Sample Input**

    Pen
    10
    Book
    5
    Bag
    2
    Book

**Sample Output**

    Size: 2
    Contains removed key: false

**Test Cases**

    # T1 (remove first)
    IN:
    A
    1
    B
    2
    C
    3
    A
    OUT:
    Size: 2
    Contains removed key: false

    # T2 (remove middle)
    IN:
    A
    1
    B
    2
    C
    3
    B
    OUT:
    Size: 2
    Contains removed key: false

    # T3 (remove last)
    IN:
    A
    1
    B
    2
    C
    3
    C
    OUT:
    Size: 2
    Contains removed key: false

    # T4 (larger initial values)
    IN:
    Rice
    100
    Corn
    200
    Wheat
    300
    Wheat
    OUT:
    Size: 2
    Contains removed key: false

    # T5 (zero quantity entry)
    IN:
    X
    0
    Y
    1
    Z
    2
    X
    OUT:
    Size: 2
    Contains removed key: false

**Concepts Practiced:** `HashMap.remove`, `.size`, key membership, map
updates.

------------------------------------------------------------------------

## 16.5 Word Score Dictionary

**Difficulty:** Hard

**Description:** Build a `HashMap<String, Int64>` from four word-score
pairs. Then read three query words. For each query, print its score if
the word exists or `0` if it does not. Do not print or depend on map
iteration order.

**Input Format:** Eleven lines: four word-score pairs, then three query
words.

**Output Format:** Three lines, one result for each query in the order
entered.

**Constraints:** The four stored words are distinct. Words contain 1 to
20 ASCII letters. Scores are from 0 to 1000.

**Sample Input**

    apple
    10
    banana
    20
    cherry
    30
    date
    40
    banana
    fig
    apple

**Sample Output**

    20
    0
    10

**Test Cases**

    # T1 (all found)
    IN:
    a
    1
    b
    2
    c
    3
    d
    4
    d
    b
    a
    OUT:
    4
    2
    1

    # T2 (all missing)
    IN:
    red
    10
    green
    20
    blue
    30
    white
    40
    black
    orange
    purple
    OUT:
    0
    0
    0

    # T3 (mixed found and missing)
    IN:
    pen
    5
    book
    10
    bag
    15
    box
    20
    bag
    case
    pen
    OUT:
    15
    0
    5

    # T4 (zero score is still a stored key)
    IN:
    A
    0
    B
    2
    C
    3
    D
    4
    A
    B
    Z
    OUT:
    0
    2
    0

    # T5 (queries repeat)
    IN:
    one
    11
    two
    22
    three
    33
    four
    44
    two
    two
    two
    OUT:
    22
    22
    22

**Concepts Practiced:** Creating and querying a `HashMap`, key lookup,
missing-key handling, stable query order.

------------------------------------------------------------------------

# TOPIC 17: Hash Sets

*HashSet iteration order is not guaranteed. These problems use
membership checks and set sizes rather than relying on traversal order.*

## 17.1 Unique Number Count

**Difficulty:** Easy

**Description:** Read five integers and insert them into a
`HashSet<Int64>`. Print the number of unique values.

**Input Format:** Five integers, one per line.

**Output Format:** One integer: the set size.

**Constraints:** Each integer is from -1000 to 1000.

**Sample Input**

    1
    2
    2
    3
    1

**Sample Output**

    3

**Test Cases**

    # T1 (all different)
    IN:
    1
    2
    3
    4
    5
    OUT:
    5

    # T2 (all same)
    IN:
    7
    7
    7
    7
    7
    OUT:
    1

    # T3 (two unique values)
    IN:
    1
    2
    1
    2
    1
    OUT:
    2

    # T4 (negative and positive)
    IN:
    -1
    -1
    0
    1
    1
    OUT:
    3

    # T5 (zeros)
    IN:
    0
    0
    0
    0
    0
    OUT:
    1

**Concepts Practiced:** `HashSet`, duplicate removal, `.size`.

------------------------------------------------------------------------

## 17.2 Check Membership

**Difficulty:** Easy

**Description:** Read four words and insert them into a
`HashSet<String>`. Then read a query word and print whether the set
contains it.

**Input Format:** Five lines: four words, then the query word.

**Output Format:** `true` if the query exists in the set; otherwise
`false`.

**Constraints:** Each word contains 1 to 20 ASCII letters. Membership is
case-sensitive.

**Sample Input**

    apple
    banana
    cherry
    date
    banana

**Sample Output**

    true

**Test Cases**

    # T1 (present)
    IN:
    red
    green
    blue
    white
    blue
    OUT:
    true

    # T2 (absent)
    IN:
    red
    green
    blue
    white
    black
    OUT:
    false

    # T3 (case-sensitive)
    IN:
    Code
    Chum
    Cang
    Jie
    code
    OUT:
    false

    # T4 (first item)
    IN:
    A
    B
    C
    D
    A
    OUT:
    true

    # T5 (last item)
    IN:
    A
    B
    C
    D
    D
    OUT:
    true

**Concepts Practiced:** `HashSet`, insertion, `.contains`, Boolean
output.

------------------------------------------------------------------------

## 17.3 Remove a Value

**Difficulty:** Medium

**Description:** Read five integers and insert them into a
`HashSet<Int64>`. Read a value to remove. Remove it if present, then
print the set size and whether it still contains the value.

**Input Format:** Six integers: five initial values, then the value to
remove.

**Output Format:** Two lines:

    Size: <number>
    Contains: <true/false>

**Constraints:** Each integer is from -1000 to 1000.

**Sample Input**

    1
    2
    2
    3
    4
    2

**Sample Output**

    Size: 3
    Contains: false

**Test Cases**

    # T1 (remove existing unique value)
    IN:
    1
    2
    3
    4
    5
    3
    OUT:
    Size: 4
    Contains: false

    # T2 (remove duplicate value)
    IN:
    1
    1
    2
    2
    3
    1
    OUT:
    Size: 2
    Contains: false

    # T3 (remove value not present)
    IN:
    1
    2
    3
    4
    5
    9
    OUT:
    Size: 5
    Contains: false

    # T4 (all values same)
    IN:
    7
    7
    7
    7
    7
    7
    OUT:
    Size: 0
    Contains: false

    # T5 (negative value)
    IN:
    -1
    -2
    -3
    -2
    0
    -2
    OUT:
    Size: 3
    Contains: false

**Concepts Practiced:** `HashSet.remove`, `.size`, `.contains`,
duplicate handling.

------------------------------------------------------------------------

## 17.4 Common Elements

**Difficulty:** Medium

**Description:** Read three integers for set A and three integers for
set B. Count how many distinct values are present in both sets. Use two
hash sets and do not rely on their iteration order.

**Input Format:** Six integers: three values for A, followed by three
values for B.

**Output Format:** One integer: the number of common distinct values.

**Constraints:** Each integer is from -1000 to 1000.

**Sample Input**

    1
    2
    3
    2
    3
    4

**Sample Output**

    2

**Test Cases**

    # T1 (two common values)
    IN:
    1
    2
    3
    2
    3
    4
    OUT:
    2

    # T2 (no common values)
    IN:
    1
    2
    3
    4
    5
    6
    OUT:
    0

    # T3 (all common)
    IN:
    1
    2
    3
    3
    2
    1
    OUT:
    3

    # T4 (duplicates in input)
    IN:
    1
    1
    2
    1
    2
    2
    OUT:
    2

    # T5 (negative values)
    IN:
    -1
    -2
    0
    -2
    0
    5
    OUT:
    2

**Concepts Practiced:** Two `HashSet` instances, membership checks,
counting distinct intersections.

------------------------------------------------------------------------

## 17.5 Set Relationship Report

**Difficulty:** Hard

**Description:** Read four integers for set A and four integers for set
B. Build two hash sets and report: 1. Number of unique values in A. 2.
Number of unique values in B. 3. Number of values common to both sets.
4. Number of values that are in A but not in B.

Do not print set elements or depend on their iteration order.

**Input Format:** Eight integers: four values for A, then four values
for B.

**Output Format:** Four lines:

    A size: <number>
    B size: <number>
    Common: <number>
    A only: <number>

**Constraints:** Each integer is from -1000 to 1000.

**Sample Input**

    1
    2
    2
    3
    2
    3
    4
    4

**Sample Output**

    A size: 3
    B size: 3
    Common: 2
    A only: 1

**Test Cases**

    # T1 (partial overlap)
    IN:
    1
    2
    2
    3
    2
    3
    4
    4
    OUT:
    A size: 3
    B size: 3
    Common: 2
    A only: 1

    # T2 (no overlap)
    IN:
    1
    2
    3
    4
    5
    6
    7
    8
    OUT:
    A size: 4
    B size: 4
    Common: 0
    A only: 4

    # T3 (same unique values)
    IN:
    1
    1
    2
    2
    2
    1
    2
    1
    OUT:
    A size: 2
    B size: 2
    Common: 2
    A only: 0

    # T4 (A is contained in B)
    IN:
    5
    5
    6
    6
    5
    6
    7
    8
    OUT:
    A size: 2
    B size: 4
    Common: 2
    A only: 0

    # T5 (negative and zero)
    IN:
    -1
    -2
    -2
    0
    -2
    0
    1
    1
    OUT:
    A size: 3
    B size: 3
    Common: 2
    A only: 1

**Concepts Practiced:** Hash set construction, uniqueness, `.size`,
`.contains`, set intersection and difference counts.

------------------------------------------------------------------------

# TOPIC 18: Range Over Builtin Types

*Collection iteration order is deterministic for arrays. Do not assume a
particular traversal order for hashmaps or hash sets.*

## 18.1 Sum an Array

**Difficulty:** Easy

**Description:** Read five integers into an array. Use a `for` loop over
the array to calculate and print the sum.

**Input Format:** Five integers, one per line.

**Output Format:** One integer: the sum.

**Constraints:** Each integer is from -1000 to 1000.

**Sample Input**

    1
    2
    3
    4
    5

**Sample Output**

    15

**Test Cases**

    # T1 (positive values)
    IN:
    1
    2
    3
    4
    5
    OUT:
    15

    # T2 (all zeros)
    IN:
    0
    0
    0
    0
    0
    OUT:
    0

    # T3 (negative values)
    IN:
    -1
    -2
    -3
    -4
    -5
    OUT:
    -15

    # T4 (mixed values)
    IN:
    10
    -10
    20
    -20
    5
    OUT:
    5

    # T5 (same values)
    IN:
    7
    7
    7
    7
    7
    OUT:
    35

**Concepts Practiced:** Arrays, `for (value in array)`, accumulation.

------------------------------------------------------------------------

## 18.2 Count Values Above a Limit

**Difficulty:** Easy

**Description:** Read a limit and four integers into an array. Iterate
over the array and count how many values are strictly greater than the
limit.

**Input Format:** Five integers: limit, followed by four array values.

**Output Format:** One integer: the count.

**Constraints:** Each integer is from -1000 to 1000.

**Sample Input**

    5
    1
    6
    5
    9

**Sample Output**

    2

**Test Cases**

    # T1 (two above)
    IN:
    5
    1
    6
    5
    9
    OUT:
    2

    # T2 (none above)
    IN:
    10
    1
    2
    3
    4
    OUT:
    0

    # T3 (all above)
    IN:
    0
    1
    2
    3
    4
    OUT:
    4

    # T4 (equal values do not count)
    IN:
    5
    5
    5
    5
    5
    OUT:
    0

    # T5 (negative limit)
    IN:
    -3
    -2
    -3
    -4
    0
    OUT:
    2

**Concepts Practiced:** Iterating over arrays, comparisons, counting.

------------------------------------------------------------------------

## 18.3 Sum Values in a Range

**Difficulty:** Medium

**Description:** Read two integers `L` and `R`, then read five integers
into an array. Sum only the array values that are within the inclusive
range `[L, R]`.

**Input Format:** Seven integers: `L`, `R`, then five array values.
`L ≤ R`.

**Output Format:** One integer: the sum of values in the range.

**Constraints:** All values are from -1000 to 1000.

**Sample Input**

    2
    6
    1
    2
    4
    6
    8

**Sample Output**

    12

**Test Cases**

    # T1 (several included)
    IN:
    2
    6
    1
    2
    4
    6
    8
    OUT:
    12

    # T2 (none included)
    IN:
    10
    20
    1
    2
    3
    4
    5
    OUT:
    0

    # T3 (all included)
    IN:
    -5
    5
    -5
    -1
    0
    3
    5
    OUT:
    2

    # T4 (single-value range)
    IN:
    4
    4
    4
    3
    4
    5
    4
    OUT:
    12

    # T5 (negative range)
    IN:
    -10
    -1
    -10
    -5
    0
    -1
    2
    OUT:
    -16

**Concepts Practiced:** Array iteration, inclusive range conditions,
accumulation.

------------------------------------------------------------------------

## 18.4 Count Map Values

**Difficulty:** Medium

**Description:** Create a `HashMap<String, Int64>` from four key-value
pairs. Iterate over the map's entries and count how many stored values
are at least the given threshold. The output is only a count, so it must
not depend on map iteration order.

**Input Format:** Nine lines: threshold, followed by four key-value
pairs.

**Output Format:** One integer: the number of map values greater than or
equal to the threshold.

**Constraints:** Keys are distinct words. Values and threshold are from
-1000 to 1000.

**Sample Input**

    50
    Ana
    90
    Ben
    40
    Kai
    50
    Mia
    70

**Sample Output**

    3

**Test Cases**

    # T1
    IN:
    50
    A
    90
    B
    40
    C
    50
    D
    70
    OUT:
    3

    # T2 (none qualify)
    IN:
    100
    A
    10
    B
    20
    C
    30
    D
    40
    OUT:
    0

    # T3 (all qualify)
    IN:
    0
    A
    0
    B
    1
    C
    2
    D
    3
    OUT:
    4

    # T4 (negative values)
    IN:
    -5
    A
    -10
    B
    -5
    C
    0
    D
    5
    OUT:
    3

    # T5 (exact threshold)
    IN:
    7
    A
    7
    B
    6
    C
    8
    D
    7
    OUT:
    3

**Concepts Practiced:** Range over `HashMap`, key-value pair iteration,
aggregate counting without relying on order.

------------------------------------------------------------------------

## 18.5 Collection Summary

**Difficulty:** Hard

**Description:** Read five integers into an array, then read three query
values. Build a `HashSet<Int64>` from the array. Use a range over the
array to calculate its total and a range over the set to count unique
values. Finally, for each query in input order, print whether the set
contains it.

**Input Format:** Eight integers: five array values, followed by three
query values.

**Output Format:** Five lines:

    Array sum: <sum>
    Unique count: <count>
    Query 1: <true/false>
    Query 2: <true/false>
    Query 3: <true/false>

**Constraints:** All integers are from -1000 to 1000.

**Sample Input**

    1
    2
    2
    3
    4
    2
    5
    1

**Sample Output**

    Array sum: 12
    Unique count: 4
    Query 1: true
    Query 2: false
    Query 3: true

**Test Cases**

    # T1 (some duplicates)
    IN:
    1
    2
    2
    3
    4
    2
    5
    1
    OUT:
    Array sum: 12
    Unique count: 4
    Query 1: true
    Query 2: false
    Query 3: true

    # T2 (all values equal)
    IN:
    7
    7
    7
    7
    7
    7
    0
    8
    OUT:
    Array sum: 35
    Unique count: 1
    Query 1: true
    Query 2: false
    Query 3: false

    # T3 (negative values)
    IN:
    -1
    -2
    -2
    0
    1
    -2
    2
    0
    OUT:
    Array sum: -4
    Unique count: 4
    Query 1: true
    Query 2: false
    Query 3: true

    # T4 (all unique)
    IN:
    1
    2
    3
    4
    5
    1
    3
    5
    OUT:
    Array sum: 15
    Unique count: 5
    Query 1: true
    Query 2: true
    Query 3: true

    # T5 (queries all absent)
    IN:
    10
    20
    30
    40
    50
    0
    1
    2
    OUT:
    Array sum: 150
    Unique count: 5
    Query 1: false
    Query 2: false
    Query 3: false

**Concepts Practiced:** Range over arrays and hash sets, aggregate
calculations, membership checks, collection traversal.

------------------------------------------------------------------------

# TOPIC 19: Iterators

*For this topic, define the custom iterable and iterator types
requested. The tests check printed output. Use the lesson's
`Iterable<T>`, `Iterator<T>`, `next(): Option<T>`, `Some`, and `None`
pattern.*

## 19.1 Count with a Custom Iterator

**Difficulty:** Easy

**Description:** Define a custom iterable type that produces the
integers from 1 through `n`. Its iterator should return one value at a
time and then return `None`. Read `n` and print all produced values on
one line, separated by single spaces.

**Input Format:** One integer `n`.

**Output Format:** The integers from 1 through `n`, separated by one
space. If `n` is 0, print an empty line.

**Constraints:** `0 ≤ n ≤ 20`.

**Sample Input**

    5

**Sample Output**

    1 2 3 4 5

**Test Cases**

    # T1 (normal)
    IN:
    5
    OUT:
    1 2 3 4 5

    # T2 (one value)
    IN:
    1
    OUT:
    1

    # T3 (zero values)
    IN:
    0
    OUT:


    # T4 (three values)
    IN:
    3
    OUT:
    1 2 3

    # T5 (maximum)
    IN:
    20
    OUT:
    1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20

**Concepts Practiced:** Custom `Iterable`, custom `Iterator`, `next`,
`Some`, `None`.

------------------------------------------------------------------------

## 19.2 Iterate Through a Fixed Sequence

**Difficulty:** Easy

**Description:** Define a custom iterable type that produces the fixed
sequence `2, 4, 6, 8, 10`. Use a custom iterator and a `for` loop to
print the values, one per line.

**Input Format:** No input. The sequence is fixed.

**Output Format:** Five lines, one number per line.

**Constraints:** No input.

**Sample Input**

**Sample Output**

    2
    4
    6
    8
    10

**Test Cases**

    # T1 (the fixed sequence)
    IN:

    OUT:
    2
    4
    6
    8
    10

    # T2 (same fixed sequence)
    IN:

    OUT:
    2
    4
    6
    8
    10

    # T3 (same fixed sequence)
    IN:

    OUT:
    2
    4
    6
    8
    10

    # T4 (same fixed sequence)
    IN:

    OUT:
    2
    4
    6
    8
    10

    # T5 (same fixed sequence)
    IN:

    OUT:
    2
    4
    6
    8
    10

**Concepts Practiced:** Implementing `Iterable<T>`, returning an
iterator, `next(): Option<T>`, iterating with `for`.

------------------------------------------------------------------------

## 19.3 Custom Countdown

**Difficulty:** Medium

**Description:** Define a custom iterable that produces a countdown from
the starting integer `n` down to 1. Its iterator returns `None` after
the final value. Print the values on one line, separated by spaces.

**Input Format:** One integer `n`.

**Output Format:** Values from `n` down to 1, separated by one space. If
`n` is 0, print an empty line.

**Constraints:** `0 ≤ n ≤ 20`.

**Sample Input**

    4

**Sample Output**

    4 3 2 1

**Test Cases**

    # T1 (normal)
    IN:
    4
    OUT:
    4 3 2 1

    # T2 (one)
    IN:
    1
    OUT:
    1

    # T3 (zero)
    IN:
    0
    OUT:


    # T4 (three)
    IN:
    3
    OUT:
    3 2 1

    # T5 (maximum)
    IN:
    20
    OUT:
    20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1

**Concepts Practiced:** Iterator state, decrementing sequence, `Some`
and `None`, custom iterable traversal.

------------------------------------------------------------------------

## 19.4 Custom Even Number Iterator

**Difficulty:** Medium

**Description:** Define a custom iterable that produces the first `n`
positive even numbers: `2, 4, 6, ...`. Use its iterator in a `for` loop
and print the sum of the produced values.

**Input Format:** One integer `n`.

**Output Format:** One integer: the sum of the first `n` positive even
numbers. If `n` is 0, the sum is 0.

**Constraints:** `0 ≤ n ≤ 100`.

**Sample Input**

    4

**Sample Output**

    20

**Test Cases**

    # T1 (four values)
    IN:
    4
    OUT:
    20

    # T2 (zero values)
    IN:
    0
    OUT:
    0

    # T3 (one value)
    IN:
    1
    OUT:
    2

    # T4 (five values)
    IN:
    5
    OUT:
    30

    # T5 (maximum)
    IN:
    100
    OUT:
    10100

**Concepts Practiced:** Custom iterator state, generating values,
summing an iterable.

------------------------------------------------------------------------

## 19.5 Nested Custom Iteration

**Difficulty:** Hard

**Description:** Define a custom iterable that produces the integers
from 1 through `n`. Use nested `for` loops over the same iterable. For
each outer value `i`, print the inner sequence from 1 through `n`, with
each value multiplied by `i`. Print one row per outer value, with values
separated by single spaces.

**Input Format:** One integer `n`.

**Output Format:** An `n` by `n` multiplication table. Each row starts
with the outer value multiplied by 1 and ends with the outer value
multiplied by `n`.

**Constraints:** `1 ≤ n ≤ 10`.

**Sample Input**

    3

**Sample Output**

    1 2 3
    2 4 6
    3 6 9

**Test Cases**

    # T1 (one row)
    IN:
    1
    OUT:
    1

    # T2 (two by two)
    IN:
    2
    OUT:
    1 2
    2 4

    # T3 (three by three)
    IN:
    3
    OUT:
    1 2 3
    2 4 6
    3 6 9

    # T4 (four by four)
    IN:
    4
    OUT:
    1 2 3 4
    2 4 6 8
    3 6 9 12
    4 8 12 16

    # T5 (maximum)
    IN:
    10
    OUT:
    1 2 3 4 5 6 7 8 9 10
    2 4 6 8 10 12 14 16 18 20
    3 6 9 12 15 18 21 24 27 30
    4 8 12 16 20 24 28 32 36 40
    5 10 15 20 25 30 35 40 45 50
    6 12 18 24 30 36 42 48 54 60
    7 14 21 28 35 42 49 56 63 70
    8 16 24 32 40 48 56 64 72 80
    9 18 27 36 45 54 63 72 81 90
    10 20 30 40 50 60 70 80 90 100

**Concepts Practiced:** Custom `Iterable`, custom `Iterator`, nested
iteration, independent iterator state, formatted row output.

------------------------------------------------------------------------

# TOPIC 20: Variadic Functions

*For this topic, define the requested function with an array as its
final parameter and call it using individual trailing arguments, as
taught in the variadic-functions lesson. A normal array argument may
also be passed when the problem requests it.*

## 20.1 Sum Three Values

**Difficulty:** Easy

**Description:** Define `func sum(values: Array<Int64>): Int64` that
returns the sum of its values. Read three integers and call the function
by passing the three values as individual arguments.

**Input Format:** Three integers, one per line.

**Output Format:** One integer: their sum.

**Constraints:** Each integer is from -100000 to 100000.

**Sample Input**

    1
    2
    3

**Sample Output**

    6

**Test Cases**

    # T1 (positive)
    IN:
    1
    2
    3
    OUT:
    6

    # T2 (negative)
    IN:
    -1
    -2
    -3
    OUT:
    -6

    # T3 (mixed)
    IN:
    10
    -5
    2
    OUT:
    7

    # T4 (zeros)
    IN:
    0
    0
    0
    OUT:
    0

    # T5 (maximum values)
    IN:
    100000
    100000
    100000
    OUT:
    300000

**Concepts Practiced:** Variadic function call, array parameter, summing
values.

------------------------------------------------------------------------

## 20.2 Find the Largest of Several Values

**Difficulty:** Easy

**Description:** Define `func largest(values: Array<Int64>): Int64` that
returns the largest value in its array. Read four integers and call the
function by passing them as individual trailing arguments.

**Input Format:** Four integers, one per line.

**Output Format:** One integer: the largest value.

**Constraints:** Each integer is from -100000 to 100000.

**Sample Input**

    4
    9
    2
    7

**Sample Output**

    9

**Test Cases**

    # T1 (largest in second position)
    IN:
    4
    9
    2
    7
    OUT:
    9

    # T2 (largest in first position)
    IN:
    10
    3
    2
    1
    OUT:
    10

    # T3 (all negative)
    IN:
    -8
    -2
    -9
    -4
    OUT:
    -2

    # T4 (all equal)
    IN:
    5
    5
    5
    5
    OUT:
    5

    # T5 (zero is largest)
    IN:
    -1
    -10
    0
    -3
    OUT:
    0

**Concepts Practiced:** Variadic arguments, array iteration, comparison
and tracking a maximum.

------------------------------------------------------------------------

## 20.3 Average of a Variable Number of Scores

**Difficulty:** Medium

**Description:** Define `func average(values: Array<Int64>): Int64` that
returns the integer average. Read five scores and pass them as
individual arguments. The average uses integer division, so the decimal
part is dropped.

**Input Format:** Five integers, one per line.

**Output Format:** One integer: the integer average.

**Constraints:** `0 ≤ each score ≤ 100`.

**Sample Input**

    80
    90
    70
    100
    60

**Sample Output**

    80

**Test Cases**

    # T1 (exact average)
    IN:
    80
    90
    70
    100
    60
    OUT:
    80

    # T2 (all zero)
    IN:
    0
    0
    0
    0
    0
    OUT:
    0

    # T3 (maximum)
    IN:
    100
    100
    100
    100
    100
    OUT:
    100

    # T4 (fraction dropped)
    IN:
    10
    10
    10
    10
    11
    OUT:
    10

    # T5 (mixed scores)
    IN:
    50
    60
    70
    80
    90
    OUT:
    70

**Concepts Practiced:** Variadic calls, array parameters, accumulation,
integer division.

------------------------------------------------------------------------

## 20.4 Build a Repeated Message

**Difficulty:** Medium

**Description:** Define
`func repeatMessage(message: String, copies: Array<Int64>): String` is
not a valid signature for this task. Instead, define
`func repeatMessage(copies: Array<String>): String`, which joins the
supplied strings with a single space between them. Read three words and
call the function using three individual trailing arguments.

**Input Format:** Three lines, each containing one word.

**Output Format:** One line containing the three words separated by one
space.

**Constraints:** Each word contains 1 to 20 ASCII letters.

**Sample Input**

    Cangjie
    is
    fun

**Sample Output**

    Cangjie is fun

**Test Cases**

    # T1 (normal)
    IN:
    I
    love
    coding
    OUT:
    I love coding

    # T2 (short words)
    IN:
    a
    b
    c
    OUT:
    a b c

    # T3 (mixed case)
    IN:
    Hello
    Code
    Chum
    OUT:
    Hello Code Chum

    # T4 (long words)
    IN:
    Programming
    Language
    Practice
    OUT:
    Programming Language Practice

    # T5 (repeated words)
    IN:
    go
    go
    go
    OUT:
    go go go

**Concepts Practiced:** Variadic function calls with `String` values,
array parameter, joining text.

------------------------------------------------------------------------

## 20.5 Variadic Statistics

**Difficulty:** Hard

**Description:** Define these functions, each using an array as its
final parameter: - `sum(values: Array<Int64>): Int64` returns the sum. -
`countAbove(limit: Int64, values: Array<Int64>): Int64` returns how many
values are strictly greater than `limit`. -
`range(values: Array<Int64>): Int64` returns the largest value minus the
smallest value.

Read a limit and five integers. Call each function using individual
trailing arguments for the five values. Print the three results.

**Input Format:** Six integers: limit, followed by five values.

**Output Format:** Three lines:

    Sum: <sum>
    Above: <count>
    Range: <maximum minus minimum>

**Constraints:** All integers are from -10000 to 10000.

**Sample Input**

    5
    1
    6
    3
    9
    5

**Sample Output**

    Sum: 24
    Above: 2
    Range: 8

**Test Cases**

    # T1 (normal)
    IN:
    5
    1
    6
    3
    9
    5
    OUT:
    Sum: 24
    Above: 2
    Range: 8

    # T2 (all equal)
    IN:
    4
    4
    4
    4
    4
    4
    OUT:
    Sum: 20
    Above: 0
    Range: 0

    # T3 (negative values)
    IN:
    -5
    -10
    -5
    0
    5
    10
    OUT:
    Sum: 0
    Above: 3
    Range: 20

    # T4 (all below limit)
    IN:
    100
    1
    2
    3
    4
    5
    OUT:
    Sum: 15
    Above: 0
    Range: 4

    # T5 (all above limit)
    IN:
    0
    1
    2
    3
    4
    5
    OUT:
    Sum: 15
    Above: 5
    Range: 4

**Concepts Practiced:** Multiple variadic functions, array parameters,
aggregation, comparisons, reusing the same arguments across function
calls.

------------------------------------------------------------------------

## Batch 2 progress

  Topics done      Problems   Easy   Medium   Hard
  -------------- ---------- ------ -------- ------
  11--20 of 10     50 of 50     20       20     10

**Checks and limitations:** - The topic names and order follow Lessons
11--20 from the Cangjie learning site. - Expected outputs were
calculated from the written problem rules and checked for internal
consistency. - HashMap and HashSet outputs avoid depending on
unspecified traversal order. - Iterator problems specify the sequence
independently so expected output does not rely on the source page's
inconsistent example comments. - This is a question-bank draft, not a
claim that every problem has been compiled against Cangjie 1.0.5. In
particular, verify the exact compiler syntax for custom
`Iterable`/`Iterator` implementations, `Option` handling, Rune
conversion, and string joining before publishing the problems to
students. - No solutions are included.

When you have a solution, paste it with the problem number (for example,
`11.3`) and I can review it against the test cases.
