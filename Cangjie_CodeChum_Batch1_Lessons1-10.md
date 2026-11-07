# Cangjie CodeChum-Style Question Bank — Batch 1 (Lessons 1–10)

> Consolidated continuation: Part A (Lessons 1–3), Part B (Lessons 4–6), and Part C (Lessons 7–10).
> The original parts are preserved below, followed by the newly generated Topics 7–10.

---

I'll start by reading the lesson site to get the actual topic list and order.

The site has 53 topics, so the expected total is 265 problems. I'll read lessons 1–10 first so Batch 1 uses the site's syntax.

Lessons 1–10 don't cover reading input (that's lesson 33), so I'll check that lesson before writing input formats.

# Cangjie CodeChum-Style Question Bank

I read the lesson index and lessons 1–10 on the site. There are **53 topics**, so the full bank is **265 problems** (106 Easy, 106 Medium, 53 Hard). Fifty problems with five or more test cases each will not fit in one reply, so I'm sending Batch 1 in parts.

**This reply covers Batch 1, Part A: Topics 1–3 (15 problems).** Topics 4–10 come next, then Batches 2–6. The bank is not complete yet.

---

## Batch 1: Topics 1–10 (50 problems)

| # | Topic | # | Topic |
|---|---|---|---|
| 1 | Hello World | 6 | Multiple Return Values |
| 2 | Constants | 7 | If Else |
| 3 | Variables | 8 | For and while loops |
| 4 | Values | 9 | Range |
| 5 | Functions | 10 | Arrays |

**Concepts covered:** `main`, printing, constants and variables, value types, functions, tuples, branching, loops, ranges, arrays.

---

## Setup notes (please read once)

**Input is not taught until lesson 33.** The lessons for topics 1–10 only teach output, but your prompt requires stdin programs. This is the input pattern, verified in lesson 33 (Console IO). It is only setup code, not a solution to any problem:

```cangjie
import std.console.*
import std.convert.*

main() {
    let line = Console.stdIn.readln().getOrThrow()   // one full line (String)
    let n = Int64.parse(line)                         // String -> Int64
    println(n)
}
```

**What I could not verify on the lesson site:**
- `Int64.parse` and `Float64.parse` (package `std.convert`) are not in lessons 1–10. I confirmed them from the Learn X in Y minutes Cangjie page, not from cjpluk.
- Printing a `Float64` with exactly 2 decimals. I believe it is `x.format(".2")`, possibly needing `import std.format.*`, but I could not confirm the package. If the compiler complains, check the official docs.
- Medium and Hard problems may use basic `if` (lesson 7) and `while` (lesson 8), as university labs normally do.

**Conventions for all problems:**
- Every input value is on its own line, so you never need to split strings.
- "2 decimals" means exactly 2 digits after the decimal point, with standard rounding.
- Test cases are written as `IN:` and `OUT:` blocks so you can copy them straight into a file.

---

# TOPIC 1: Hello World

## 1.1 Greet the Student
**Difficulty:** Easy

**Description:** A school kiosk greets each student by name. Read a name and print a greeting.

**Input Format:** One line containing the student's name.

**Output Format:** One line: `Hello, <name>!`

**Constraints:**

| Item | Limit |
|---|---|
| Name length | 1 to 50 characters |
| Characters | Letters, spaces, hyphens, apostrophes |
| Spaces | No leading or trailing spaces |

**Sample Input**
```
Ana
```
**Sample Output**
```
Hello, Ana!
```

**Test Cases**
```
# T1 (normal)
IN:
Juan dela Cruz
OUT:
Hello, Juan dela Cruz!

# T2 (minimum length)
IN:
A
OUT:
Hello, A!

# T3 (maximum length, 50 chars)
IN:
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwx
OUT:
Hello, ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwx!

# T4 (special characters)
IN:
Li-Ann O'Brien
OUT:
Hello, Li-Ann O'Brien!

# T5 (single space inside)
IN:
Li Na
OUT:
Hello, Li Na!
```

**Concepts Practiced:** `main` function, `println`, reading a line, building output text.

---

## 1.2 Event Welcome Poster
**Difficulty:** Easy

**Description:** Print a three-line welcome poster for an event, using the event name and venue you are given.

**Input Format:** Two lines. Line 1 is the event name. Line 2 is the venue.

**Output Format:** Exactly three lines:
```
=== WELCOME ===
Event: <event>
Venue: <venue>
```

**Constraints:** Each line is 1 to 40 printable ASCII characters. No leading or trailing spaces. Spaces inside the text are allowed.

**Sample Input**
```
Tech Fair
Main Hall
```
**Sample Output**
```
=== WELCOME ===
Event: Tech Fair
Venue: Main Hall
```

**Test Cases**
```
# T1 (normal)
IN:
Hack Night
Lab 2
OUT:
=== WELCOME ===
Event: Hack Night
Venue: Lab 2

# T2 (minimum)
IN:
A
B
OUT:
=== WELCOME ===
Event: A
Venue: B

# T3 (maximum, 40-char event)
IN:
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmn
Room 101
OUT:
=== WELCOME ===
Event: ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmn
Venue: Room 101

# T4 (symbols)
IN:
Hack#2026 Finals!
Gym (2F)
OUT:
=== WELCOME ===
Event: Hack#2026 Finals!
Venue: Gym (2F)

# T5 (double space must be kept)
IN:
Code  Camp
Lab
OUT:
=== WELCOME ===
Event: Code  Camp
Venue: Lab
```

**Concepts Practiced:** `println`, reading several lines, keeping text exactly as read.

---

## 1.3 Word Staircase
**Difficulty:** Medium

**Description:** Read four words. Print a staircase where each row adds one more word to the previous row, with words separated by one space.

**Input Format:** Four lines, one word per line.

**Output Format:** Four lines. Row 1 has word 1. Row 2 has words 1 and 2. Row 3 has words 1 to 3. Row 4 has all four. No trailing spaces.

**Constraints:** Each word is 1 to 15 characters, with no spaces.

**Sample Input**
```
I
love
Cangjie
code
```
**Sample Output**
```
I
I love
I love Cangjie
I love Cangjie code
```

**Test Cases**
```
# T1 (normal)
IN:
Go
to
Cebu
now
OUT:
Go
Go to
Go to Cebu
Go to Cebu now

# T2 (single-letter words)
IN:
A
B
C
D
OUT:
A
A B
A B C
A B C D

# T3 (maximum, 15-char words)
IN:
abcdefghijklmno
pqrstuvwxyzabcd
efghijklmnopqrs
tuvwxyzabcdefgh
OUT:
abcdefghijklmno
abcdefghijklmno pqrstuvwxyzabcd
abcdefghijklmno pqrstuvwxyzabcd efghijklmnopqrs
abcdefghijklmno pqrstuvwxyzabcd efghijklmnopqrs tuvwxyzabcdefgh

# T4 (digits and mixed case)
IN:
Go
2
Mars
99
OUT:
Go
Go 2
Go 2 Mars
Go 2 Mars 99

# T5 (repeated words)
IN:
no
no
no
yes
OUT:
no
no no
no no no
no no no yes
```

**Concepts Practiced:** `print` vs `println`, reading multiple inputs, building lines step by step, no trailing spaces.

---

## 1.4 Reverse Numbered Echo
**Difficulty:** Medium

**Description:** Read three lines of text. Print them back in reverse order, numbered from 3 down to 1, then print an end marker.

**Input Format:** Three lines of text.

**Output Format:** Four lines:
```
3. <line 3>
2. <line 2>
1. <line 1>
--- END ---
```

**Constraints:** Each line is 1 to 40 printable ASCII characters, with no leading or trailing spaces.

**Sample Input**
```
first
second
third
```
**Sample Output**
```
3. third
2. second
1. first
--- END ---
```

**Test Cases**
```
# T1 (normal)
IN:
apple
banana
cherry
OUT:
3. cherry
2. banana
1. apple
--- END ---

# T2 (minimum)
IN:
a
b
c
OUT:
3. c
2. b
1. a
--- END ---

# T3 (maximum length)
IN:
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmn
mid
end
OUT:
3. end
2. mid
1. ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmn
--- END ---

# T4 (input already looks numbered)
IN:
1. one
2. two
3. three
OUT:
3. 3. three
2. 2. two
1. 1. one
--- END ---

# T5 (identical lines)
IN:
same
same
same
OUT:
3. same
2. same
1. same
--- END ---
```

**Concepts Practiced:** Reading multiple lines, storing them, controlling output order, string interpolation or concatenation.

---

## 1.5 Quote Board
**Difficulty:** Hard

**Description:** A class bulletin board shows two quotes of the day. Print a framed board. The quotes must appear inside double quotation marks. Every content line starts with exactly one space.

**Input Format:** Four lines: the date, the author, quote 1, quote 2.

**Output Format:** Exactly six lines. The border line is `+`, then 30 `-` characters, then `+`.
```
+------------------------------+
 QUOTE BOARD - <date>
 1) "<quote 1>"
 2) "<quote 2>"
 by <author>
+------------------------------+
```

**Constraints:** Each line is 1 to 40 printable ASCII characters, and none contains a double quote. No leading or trailing spaces.

**Sample Input**
```
2026-11-07
Ada Lovelace
Imagination is key
Code with care
```
**Sample Output**
```
+------------------------------+
 QUOTE BOARD - 2026-11-07
 1) "Imagination is key"
 2) "Code with care"
 by Ada Lovelace
+------------------------------+
```

**Test Cases**
```
# T1 (normal)
IN:
2026-12-01
Grace Hopper
Debugging is fun
Ship it
OUT:
+------------------------------+
 QUOTE BOARD - 2026-12-01
 1) "Debugging is fun"
 2) "Ship it"
 by Grace Hopper
+------------------------------+

# T2 (minimum)
IN:
D
A
Q
R
OUT:
+------------------------------+
 QUOTE BOARD - D
 1) "Q"
 2) "R"
 by A
+------------------------------+

# T3 (maximum 40-char quotes)
IN:
2026-01-01
Anon
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmn
abcdefghijklmnABCDEFGHIJKLMNOPQRSTUVWXYZ
OUT:
+------------------------------+
 QUOTE BOARD - 2026-01-01
 1) "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmn"
 2) "abcdefghijklmnABCDEFGHIJKLMNOPQRSTUVWXYZ"
 by Anon
+------------------------------+

# T4 (apostrophes and punctuation)
IN:
Nov 7
Dr. Who
It's done, finally!
Don't stop
OUT:
+------------------------------+
 QUOTE BOARD - Nov 7
 1) "It's done, finally!"
 2) "Don't stop"
 by Dr. Who
+------------------------------+

# T5 (author with periods)
IN:
2027-02-14
J. K. Rowling
Words are magic
Read more
OUT:
+------------------------------+
 QUOTE BOARD - 2027-02-14
 1) "Words are magic"
 2) "Read more"
 by J. K. Rowling
+------------------------------+
```

**Concepts Practiced:** Multi-line output, literal double quotes in output, exact spacing, reading four inputs.

*Note: Topic 1 only teaches `main` and `println`, so its Hard problem is about output precision rather than algorithms.*

---

# TOPIC 2: Constants

## 2.1 Circle Area
**Difficulty:** Easy

**Description:** Declare the value of PI as a constant: `3.14159`, type `Float64`, declared with `let`. Read a radius and compute the circle's area.

**Input Format:** One integer: the radius.

**Output Format:** One line with the area (PI × r × r) to 2 decimal places.

**Constraints:** 0 ≤ radius ≤ 1000

**Sample Input**
```
2
```
**Sample Output**
```
12.57
```

**Test Cases**
```
# T1 (normal)
IN:
3
OUT:
28.27

# T2 (zero)
IN:
0
OUT:
0.00

# T3 (maximum)
IN:
1000
OUT:
3141590.00

# T4 (radius 1)
IN:
1
OUT:
3.14

# T5 (rounds up)
IN:
10
OUT:
314.16
```

**Concepts Practiced:** `let` constant, explicit `Float64` type, `Float64(...)` conversion, 2-decimal formatting.

---

## 2.2 Fixed Exchange Rate
**Difficulty:** Easy

**Description:** A money changer uses a fixed rate of 56 PHP per 1 USD. Declare the rate as an `Int64` constant. Read an amount in USD and convert it.

**Input Format:** One integer: the USD amount.

**Output Format:** One line: `<usd> USD = <php> PHP`

**Constraints:** 0 ≤ USD ≤ 1,000,000

**Sample Input**
```
10
```
**Sample Output**
```
10 USD = 560 PHP
```

**Test Cases**
```
# T1 (normal)
IN:
25
OUT:
25 USD = 1400 PHP

# T2 (zero)
IN:
0
OUT:
0 USD = 0 PHP

# T3 (maximum)
IN:
1000000
OUT:
1000000 USD = 56000000 PHP

# T4 (one)
IN:
1
OUT:
1 USD = 56 PHP

# T5 (hundred)
IN:
100
OUT:
100 USD = 5600 PHP
```

**Concepts Practiced:** `let` with `Int64`, constants in calculations, string interpolation.

---

## 2.3 Tuition Computation
**Difficulty:** Medium

**Description:** A school uses these fixed fees. Declare each as a constant.

| Fee | Value |
|---|---|
| Lecture unit | 1425 |
| Lab unit | 1975 |
| Miscellaneous (flat) | 3250 |

Tuition = lecture units × 1425 + lab units × 1975. The scholarship discount is `Tuition × P / 100` using **integer division** (the decimal part is dropped). The miscellaneous fee is not discounted.

**Input Format:** Three integers, one per line: lecture units, lab units, scholarship percent P.

**Output Format:** Four lines:
```
Tuition: <tuition>
Discount: <discount>
Misc: 3250
Total: <tuition - discount + misc>
```

**Constraints:** 0 ≤ lecture ≤ 30, 0 ≤ lab ≤ 10, 0 ≤ P ≤ 100

**Sample Input**
```
10
2
50
```
**Sample Output**
```
Tuition: 18200
Discount: 9100
Misc: 3250
Total: 12350
```

**Test Cases**
```
# T1 (normal)
IN:
18
3
20
OUT:
Tuition: 31575
Discount: 6315
Misc: 3250
Total: 28510

# T2 (minimum)
IN:
0
0
0
OUT:
Tuition: 0
Discount: 0
Misc: 3250
Total: 3250

# T3 (maximum, full scholarship)
IN:
30
10
100
OUT:
Tuition: 62500
Discount: 62500
Misc: 3250
Total: 3250

# T4 (integer division drops .5)
IN:
1
0
10
OUT:
Tuition: 1425
Discount: 142
Misc: 3250
Total: 4533

# T5 (drops .75)
IN:
7
2
99
OUT:
Tuition: 13925
Discount: 13785
Misc: 3250
Total: 3390
```

**Concepts Practiced:** Several `let` constants, `Int64` arithmetic, integer division, multi-line output.

---

## 2.4 Fuel Efficiency Report
**Difficulty:** Medium

**Description:** Declare the fuel price as a constant: `62.50` per liter, type `Float64`. Read the distance driven and the liters used. Compute the efficiency (km ÷ liters) and the total fuel cost (liters × price). The inputs are integers, so convert them before dividing.

**Input Format:** Two integers, one per line: distance in km, then liters used.

**Output Format:** Two lines, each number with 2 decimals:
```
Efficiency: <value> km/L
Fuel cost: <value>
```

**Constraints:** 0 ≤ km ≤ 100000, 1 ≤ liters ≤ 1000

**Sample Input**
```
150
10
```
**Sample Output**
```
Efficiency: 15.00 km/L
Fuel cost: 625.00
```

**Test Cases**
```
# T1 (normal)
IN:
300
20
OUT:
Efficiency: 15.00 km/L
Fuel cost: 1250.00

# T2 (minimum)
IN:
0
1
OUT:
Efficiency: 0.00 km/L
Fuel cost: 62.50

# T3 (maximum)
IN:
100000
1000
OUT:
Efficiency: 100.00 km/L
Fuel cost: 62500.00

# T4 (repeating decimal)
IN:
100
3
OUT:
Efficiency: 33.33 km/L
Fuel cost: 187.50

# T5 (tiny efficiency)
IN:
1
1000
OUT:
Efficiency: 0.00 km/L
Fuel cost: 62500.00
```

**Concepts Practiced:** `Float64` constant, `Float64(...)` conversion, float division, 2-decimal formatting.

---

## 2.5 Tricycle Fare Calculator
**Difficulty:** Hard

**Description:** A tricycle route is measured on a grid. Declare these constants:

| Constant | Type | Value |
|---|---|---|
| Base fare | `Float64` | 15.0 |
| Rate per km | `Float64` | 8.5 |
| Terminal fee | `Int64` | 5 |
| Km per grid unit | `Float64` | 0.5 |

Read the start point (x1, y1) and end point (x2, y2). The straight-line distance in grid units is `sqrt(dx² + dy²)`. Distance in km = grid distance × 0.5. Fare = base fare + km × rate + terminal fee.

**Input Format:** Four integers, one per line: x1, y1, x2, y2.

**Output Format:** Two lines, each number with 2 decimals:
```
Distance: <km> km
Fare: <fare>
```

**Constraints:** -1000 ≤ x1, y1, x2, y2 ≤ 1000

**Sample Input**
```
0
0
3
4
```
**Sample Output**
```
Distance: 2.50 km
Fare: 41.25
```

**Test Cases**
```
# T1 (normal, 3-4-5 triangle)
IN:
0
0
3
4
OUT:
Distance: 2.50 km
Fare: 41.25

# T2 (same point)
IN:
0
0
0
0
OUT:
Distance: 0.00 km
Fare: 20.00

# T3 (maximum span)
IN:
-1000
-1000
1000
1000
OUT:
Distance: 1414.21 km
Fare: 12040.82

# T4 (vertical line)
IN:
5
5
5
17
OUT:
Distance: 6.00 km
Fare: 71.00

# T5 (non-integer distance)
IN:
1
2
2
3
OUT:
Distance: 0.71 km
Fare: 26.01

# T6 (negative coordinates)
IN:
-3
-4
0
0
OUT:
Distance: 2.50 km
Fare: 41.25
```

**Concepts Practiced:** Mixed `Int64`/`Float64` constants, type conversion, `import std.math.*` and `sqrt`, multi-step float calculation.

---

# TOPIC 3: Variables

## 3.1 Swap Two Numbers
**Difficulty:** Easy

**Description:** Read two integers into `var` variables, swap their values, and print them.

**Input Format:** Two integers, one per line: a, then b.

**Output Format:** One line: the new `a`, a space, then the new `b`.

**Constraints:** -1,000,000 ≤ a, b ≤ 1,000,000

**Sample Input**
```
3
7
```
**Sample Output**
```
7 3
```

**Test Cases**
```
# T1 (normal)
IN:
12
34
OUT:
34 12

# T2 (zeros)
IN:
0
0
OUT:
0 0

# T3 (negative and positive)
IN:
-5
5
OUT:
5 -5

# T4 (extremes)
IN:
1000000
-1000000
OUT:
-1000000 1000000

# T5 (equal values)
IN:
42
42
OUT:
42 42
```

**Concepts Practiced:** `var` declaration, reassignment, tuple-style variable declaration.

---

## 3.2 Running Score
**Difficulty:** Easy

**Description:** Start a `var` score at 0. Read three round scores and add each one to the score in order. Print the total after each round.

**Input Format:** Three integers, one per line.

**Output Format:** Three lines: the total after round 1, round 2, and round 3.

**Constraints:** -100 ≤ each score ≤ 100

**Sample Input**
```
5
3
2
```
**Sample Output**
```
5
8
10
```

**Test Cases**
```
# T1 (normal)
IN:
10
20
30
OUT:
10
30
60

# T2 (all zero)
IN:
0
0
0
OUT:
0
0
0

# T3 (minimum values)
IN:
-100
-100
-100
OUT:
-100
-200
-300

# T4 (total returns to zero)
IN:
100
-100
50
OUT:
100
0
50

# T5 (alternating)
IN:
1
-1
1
OUT:
1
0
1
```

**Concepts Practiced:** `var`, compound assignment (`+=`), reusing one variable.

---

## 3.3 Min, Max, and Total
**Difficulty:** Medium

**Description:** A fitness app records steps for five days. Track the smallest day, the largest day, and the total using `var` variables. Do not use any library function for min or max.

**Input Format:** Five integers, one per line.

**Output Format:** Three lines:
```
Min: <value>
Max: <value>
Total: <value>
```

**Constraints:** -1000 ≤ each value ≤ 1000

**Sample Input**
```
3
9
1
7
5
```
**Sample Output**
```
Min: 1
Max: 9
Total: 25
```

**Test Cases**
```
# T1 (normal)
IN:
8
2
6
4
10
OUT:
Min: 2
Max: 10
Total: 30

# T2 (all equal)
IN:
4
4
4
4
4
OUT:
Min: 4
Max: 4
Total: 20

# T3 (all negative)
IN:
-5
-2
-9
-1
-7
OUT:
Min: -9
Max: -1
Total: -24

# T4 (extremes cancel out)
IN:
1000
-1000
0
1000
-1000
OUT:
Min: -1000
Max: 1000
Total: 0

# T5 (ascending order)
IN:
1
2
3
4
5
OUT:
Min: 1
Max: 5
Total: 15

# T6 (descending order, min last)
IN:
5
4
3
2
1
OUT:
Min: 1
Max: 5
Total: 15
```

**Concepts Practiced:** `var` tracking variables, initializing from the first input, `if` comparisons, accumulation.

---

## 3.4 Price Adjustment Chain
**Difficulty:** Medium

**Description:** Keep the price in one `var`. Start at the base price and subtract a coupon amount. If the result is below 0, set it to 0. Then add tax: `price + price × T / 100`, using integer division. Print the price after each step.

**Input Format:** Three integers, one per line: base price P, coupon C, tax percent T.

**Output Format:** Two lines:
```
After coupon: <price>
After tax: <price>
```

**Constraints:** 0 ≤ P ≤ 100000, 0 ≤ C ≤ 100000, 0 ≤ T ≤ 100

**Sample Input**
```
500
50
12
```
**Sample Output**
```
After coupon: 450
After tax: 504
```

**Test Cases**
```
# T1 (normal)
IN:
200
20
10
OUT:
After coupon: 180
After tax: 198

# T2 (coupon equals price)
IN:
100
100
10
OUT:
After coupon: 0
After tax: 0

# T3 (coupon larger than price)
IN:
100
500
10
OUT:
After coupon: 0
After tax: 0

# T4 (tax drops decimals)
IN:
999
1
7
OUT:
After coupon: 998
After tax: 1067

# T5 (maximum price, 100% tax)
IN:
100000
0
100
OUT:
After coupon: 100000
After tax: 200000

# T6 (tax too small to count)
IN:
33
0
1
OUT:
After coupon: 33
After tax: 33
```

**Concepts Practiced:** One `var` reassigned several times, clamping with `if`, integer division.

---

## 3.5 Triple Rotation Simulator
**Difficulty:** Hard

**Description:** Three `var` variables a, b, c change in steps. In each step, all three update **at the same time**: the new `a` is the old `b`, the new `b` is the old `c`, and the new `c` is the old `a + b + c`. Read the starting values and the number of steps K. Print the values after K steps.

**Input Format:** Four integers, one per line: a, b, c, K.

**Output Format:** One line: `a b c` after K steps, separated by single spaces.

**Constraints:** -10 ≤ a, b, c ≤ 10, 0 ≤ K ≤ 20

**Sample Input**
```
0
0
1
3
```
**Sample Output**
```
1 2 4
```

**Test Cases**
```
# T1 (K = 0, nothing changes)
IN:
0
0
1
0
OUT:
0 0 1

# T2 (normal)
IN:
0
0
1
5
OUT:
4 7 13

# T3 (all ones)
IN:
1
1
1
3
OUT:
3 5 9

# T4 (negative values)
IN:
-10
-10
-10
2
OUT:
-10 -30 -50

# T5 (sum becomes zero)
IN:
10
-10
0
4
OUT:
-10 -10 -20

# T6 (maximum values and steps)
IN:
10
10
10
20
OUT:
855250 1573050 2893290
```

**Concepts Practiced:** Several `var` variables, simultaneous update (temporary values or tuple variables), `while` loop, avoiding overwriting a value too early.

---

## Batch 1 progress

| Topics done | Problems so far | Easy | Medium | Hard |
|---|---|---|---|---|
| 1–3 of 10 | 15 of 50 | 6 | 6 | 3 |

**Checks I made:**
- I computed every expected output by hand, including rounding and integer-division cases.
- I used only syntax from the lessons plus the stdin and parse pattern flagged above.
- No solutions are included.

**Not done yet:** Topics 4–10 of Batch 1, and Batches 2–6. Say "continue" and I'll send Topics 4–6 next.

When you have a solution, paste it with the problem number (for example "1.3") and I'll review it against the test cases as your instructor.

---

# Batch 1, Part B: Topics 4–6 (15 problems)

The same conventions and setup notes from Part A apply. One value per input line, `IN:` and `OUT:` test blocks, and no solutions.

**Division note:** I verified the lesson syntax, but not how this Cangjie version rounds division of negative numbers. So every integer-division problem here uses non-negative inputs only.

---

# TOPIC 4: Values

## 4.1 Comparison Report
**Difficulty:** Easy

**Description:** Read two integers and report how they compare. Each result is a Boolean value.

**Input Format:** Two integers, one per line: a, then b.

**Output Format:** Three lines:
```
a > b: <true/false>
a == b: <true/false>
a < b: <true/false>
```

**Constraints:** -1,000,000,000 ≤ a, b ≤ 1,000,000,000

**Sample Input**
```
10
2
```
**Sample Output**
```
a > b: true
a == b: false
a < b: false
```

**Test Cases**
```
# T1 (a larger)
IN:
5
3
OUT:
a > b: true
a == b: false
a < b: false

# T2 (a smaller)
IN:
3
5
OUT:
a > b: false
a == b: false
a < b: true

# T3 (equal)
IN:
4
4
OUT:
a > b: false
a == b: true
a < b: false

# T4 (extreme values)
IN:
-1000000000
1000000000
OUT:
a > b: false
a == b: false
a < b: true

# T5 (negatives)
IN:
-7
-8
OUT:
a > b: true
a == b: false
a < b: false

# T6 (zeros)
IN:
0
0
OUT:
a > b: false
a == b: true
a < b: false
```

**Concepts Practiced:** `Bool` values, comparison operators, string interpolation of expressions.

---

## 4.2 Logic Gates on One Number
**Difficulty:** Easy

**Description:** Read an integer n. Print five Boolean results built with `&&`, `||`, and `!`. "Positive" means n > 0. "Even" means n is divisible by 2.

**Input Format:** One integer n.

**Output Format:** Five lines:
```
positive: <bool>
even: <bool>
positive and even: <bool>
positive or even: <bool>
not positive: <bool>
```

**Constraints:** -1,000,000,000 ≤ n ≤ 1,000,000,000

**Sample Input**
```
10
```
**Sample Output**
```
positive: true
even: true
positive and even: true
positive or even: true
not positive: false
```

**Test Cases**
```
# T1 (positive, odd)
IN:
7
OUT:
positive: true
even: false
positive and even: false
positive or even: true
not positive: false

# T2 (negative, odd)
IN:
-3
OUT:
positive: false
even: false
positive and even: false
positive or even: false
not positive: true

# T3 (zero)
IN:
0
OUT:
positive: false
even: true
positive and even: false
positive or even: true
not positive: true

# T4 (negative, even)
IN:
-4
OUT:
positive: false
even: true
positive and even: false
positive or even: true
not positive: true

# T5 (maximum)
IN:
1000000000
OUT:
positive: true
even: true
positive and even: true
positive or even: true
not positive: false

# T6 (positive, small odd)
IN:
1
OUT:
positive: true
even: false
positive and even: false
positive or even: true
not positive: false
```

**Concepts Practiced:** `&&`, `||`, `!`, `%`, Boolean output.

---

## 4.3 Seconds to Hours, Minutes, Seconds
**Difficulty:** Medium

**Description:** A video player stores durations in seconds. Convert a number of seconds into hours, minutes, and seconds. Minutes and seconds must each be less than 60. Hours can be any size.

**Input Format:** One integer: total seconds.

**Output Format:** One line: `<h>h <m>m <s>s`, with no zero padding.

**Constraints:** 0 ≤ seconds ≤ 1,000,000,000

**Sample Input**
```
3661
```
**Sample Output**
```
1h 1m 1s
```

**Test Cases**
```
# T1 (minimum)
IN:
0
OUT:
0h 0m 0s

# T2 (seconds only)
IN:
59
OUT:
0h 0m 59s

# T3 (exactly one hour)
IN:
3600
OUT:
1h 0m 0s

# T4 (one second before 24 hours)
IN:
86399
OUT:
23h 59m 59s

# T5 (maximum)
IN:
1000000000
OUT:
277777h 46m 40s

# T6 (exactly one minute)
IN:
60
OUT:
0h 1m 0s
```

**Concepts Practiced:** `Int64` arithmetic, `/` and `%`, string interpolation.

---

## 4.4 Order Line Summary
**Difficulty:** Medium

**Description:** Read an item name, a quantity, and a unit price. Print the order line and whether it is a "big order". A big order has a line total of 1000 or more.

**Input Format:** Three lines: item name (text), quantity (integer), unit price (integer).

**Output Format:** Two lines:
```
<name> x<qty> @ <price> = <total>
Big order: <true/false>
```

**Constraints:** Name is 1 to 20 characters. 0 ≤ quantity ≤ 1000. 0 ≤ price ≤ 100000.

**Sample Input**
```
Pen
10
5
```
**Sample Output**
```
Pen x10 @ 5 = 50
Big order: false
```

**Test Cases**
```
# T1 (small order)
IN:
Eraser
4
25
OUT:
Eraser x4 @ 25 = 100
Big order: false

# T2 (zero quantity)
IN:
Gum
0
100
OUT:
Gum x0 @ 100 = 0
Big order: false

# T3 (exact boundary 1000)
IN:
Rice
20
50
OUT:
Rice x20 @ 50 = 1000
Big order: true

# T4 (just below boundary)
IN:
Candy
3
333
OUT:
Candy x3 @ 333 = 999
Big order: false

# T5 (maximum)
IN:
Gold
1000
100000
OUT:
Gold x1000 @ 100000 = 100000000
Big order: true

# T6 (single expensive item)
IN:
Laptop
1
45000
OUT:
Laptop x1 @ 45000 = 45000
Big order: true
```

**Concepts Practiced:** Mixing `String` and `Int64` values, converting text input to a number, `Bool` from a comparison.

---

## 4.5 Number Classifier
**Difficulty:** Hard

**Description:** Read an integer n and print a seven-line report. Rules:
- **Sign:** `positive`, `negative`, or `zero`.
- **Parity:** `even` if n is divisible by 2, otherwise `odd`.
- **Divisible by 3 / 5:** Boolean results.
- **Last digit:** the last digit of the absolute value, so it is never negative.
- **Digit count:** the number of digits in the absolute value. Zero has 1 digit.
- **Palindrome:** `true` if the digits of the absolute value read the same forwards and backwards. A single digit is a palindrome.

**Input Format:** One integer n.

**Output Format:**
```
Sign: <positive/negative/zero>
Parity: <even/odd>
Divisible by 3: <bool>
Divisible by 5: <bool>
Last digit: <digit>
Digit count: <count>
Palindrome: <bool>
```

**Constraints:** -1,000,000,000 ≤ n ≤ 1,000,000,000

**Sample Input**
```
45
```
**Sample Output**
```
Sign: positive
Parity: odd
Divisible by 3: true
Divisible by 5: true
Last digit: 5
Digit count: 2
Palindrome: false
```

**Test Cases**
```
# T1 (palindrome)
IN:
121
OUT:
Sign: positive
Parity: odd
Divisible by 3: false
Divisible by 5: false
Last digit: 1
Digit count: 3
Palindrome: true

# T2 (zero)
IN:
0
OUT:
Sign: zero
Parity: even
Divisible by 3: true
Divisible by 5: true
Last digit: 0
Digit count: 1
Palindrome: true

# T3 (negative)
IN:
-15
OUT:
Sign: negative
Parity: odd
Divisible by 3: true
Divisible by 5: true
Last digit: 5
Digit count: 2
Palindrome: false

# T4 (maximum)
IN:
1000000000
OUT:
Sign: positive
Parity: even
Divisible by 3: false
Divisible by 5: true
Last digit: 0
Digit count: 10
Palindrome: false

# T5 (minimum)
IN:
-1000000000
OUT:
Sign: negative
Parity: even
Divisible by 3: false
Divisible by 5: true
Last digit: 0
Digit count: 10
Palindrome: false

# T6 (odd-length palindrome)
IN:
12321
OUT:
Sign: positive
Parity: odd
Divisible by 3: true
Divisible by 5: false
Last digit: 1
Digit count: 5
Palindrome: true

# T7 (negative single digit)
IN:
-7
OUT:
Sign: negative
Parity: odd
Divisible by 3: false
Divisible by 5: false
Last digit: 7
Digit count: 1
Palindrome: true
```

**Concepts Practiced:** `Int64`, `Bool`, `if`/`else`, `while`, `%` and `/`, handling negative input, string output.

---

# TOPIC 5: Functions

*For this topic, your program must define the named functions in each problem and call them. The tests only check the printed output.*

## 5.1 Rectangle Area Function
**Difficulty:** Easy

**Description:** Write `func area(w: Int64, h: Int64): Int64`. Read a width and a height, call your function, and print the result.

**Input Format:** Two integers, one per line: width, then height.

**Output Format:** One integer: the area.

**Constraints:** 0 ≤ w, h ≤ 1000

**Sample Input**
```
3
4
```
**Sample Output**
```
12
```

**Test Cases**
```
# T1 (normal)
IN:
250
40
OUT:
10000

# T2 (zero width)
IN:
0
5
OUT:
0

# T3 (maximum)
IN:
1000
1000
OUT:
1000000

# T4 (minimum nonzero)
IN:
1
1
OUT:
1

# T5 (zero height)
IN:
7
0
OUT:
0
```

**Concepts Practiced:** Function definition, parameters with types, return type, implicit last-expression return.

---

## 5.2 Celsius to Fahrenheit
**Difficulty:** Easy

**Description:** Write `func toF(c: Int64): Int64` that returns `c * 9 / 5 + 32` using integer division. Read a Celsius temperature and print the Fahrenheit value.

**Input Format:** One integer: degrees Celsius.

**Output Format:** One integer: degrees Fahrenheit.

**Constraints:** 0 ≤ C ≤ 100

**Sample Input**
```
100
```
**Sample Output**
```
212
```

**Test Cases**
```
# T1 (minimum)
IN:
0
OUT:
32

# T2 (normal)
IN:
25
OUT:
77

# T3 (decimal dropped)
IN:
37
OUT:
98

# T4 (small value)
IN:
1
OUT:
33

# T5 (decimal dropped, high)
IN:
99
OUT:
210
```

**Concepts Practiced:** Functions with one parameter, `Int64` arithmetic, integer division.

---

## 5.3 Grade Letter Function
**Difficulty:** Medium

**Description:** Write `func letter(score: Int64): String` that returns a letter grade:

| Score | Letter |
|---|---|
| 90 to 100 | A |
| 80 to 89 | B |
| 70 to 79 | C |
| 60 to 69 | D |
| 0 to 59 | F |

Read three scores. Print each score's letter, then the integer average (sum ÷ 3, decimals dropped) and the letter of that average.

**Input Format:** Three integers, one per line.

**Output Format:** Four lines:
```
Score <s1>: <letter>
Score <s2>: <letter>
Score <s3>: <letter>
Average: <avg> (<letter>)
```

**Constraints:** 0 ≤ each score ≤ 100

**Sample Input**
```
92
81
70
```
**Sample Output**
```
Score 92: A
Score 81: B
Score 70: C
Average: 81 (B)
```

**Test Cases**
```
# T1 (normal)
IN:
95
85
75
OUT:
Score 95: A
Score 85: B
Score 75: C
Average: 85 (B)

# T2 (minimum)
IN:
0
0
0
OUT:
Score 0: F
Score 0: F
Score 0: F
Average: 0 (F)

# T3 (maximum)
IN:
100
100
100
OUT:
Score 100: A
Score 100: A
Score 100: A
Average: 100 (A)

# T4 (boundaries 90, 89, 60)
IN:
90
89
60
OUT:
Score 90: A
Score 89: B
Score 60: D
Average: 79 (C)

# T5 (boundaries 59, 70, 80)
IN:
59
70
80
OUT:
Score 59: F
Score 70: C
Score 80: B
Average: 69 (D)

# T6 (just below each cutoff)
IN:
69
79
89
OUT:
Score 69: D
Score 79: C
Score 89: B
Average: 79 (C)
```

**Concepts Practiced:** Functions returning `String`, `if`/`else if`/`else` as the last expression, calling one function several times.

---

## 5.4 Power and Digit Sum
**Difficulty:** Medium

**Description:** Write two functions:
- `func power(base: Int64, exp: Int64): Int64` returns base raised to exp. It must work for exp = 0, which gives 1.
- `func digitSum(n: Int64): Int64` returns the sum of the digits of n.

Read a base and an exponent. Print the power, then the digit sum of that power. Do not use a library power function.

**Input Format:** Two integers, one per line: base, then exp.

**Output Format:** Two lines:
```
<base>^<exp> = <value>
Digit sum: <sum>
```

**Constraints:** 1 ≤ base ≤ 20, 0 ≤ exp ≤ 12

**Sample Input**
```
2
10
```
**Sample Output**
```
2^10 = 1024
Digit sum: 7
```

**Test Cases**
```
# T1 (normal)
IN:
3
4
OUT:
3^4 = 81
Digit sum: 9

# T2 (exponent zero)
IN:
5
0
OUT:
5^0 = 1
Digit sum: 1

# T3 (maximum)
IN:
20
12
OUT:
20^12 = 4096000000000000
Digit sum: 19

# T4 (base one)
IN:
1
12
OUT:
1^12 = 1
Digit sum: 1

# T5 (five-digit result)
IN:
7
5
OUT:
7^5 = 16807
Digit sum: 22

# T6 (six-digit result)
IN:
9
6
OUT:
9^6 = 531441
Digit sum: 18
```

**Concepts Practiced:** Multiple functions, calling one function with another's result, `while` loops inside functions, `Int64` range.

---

## 5.5 Prime Toolkit
**Difficulty:** Hard

**Description:** Write these functions:
- `func isPrime(n: Int64): Bool`
- `func nextPrime(n: Int64): Int64` returns the smallest prime strictly greater than n.

Read L and R. Report on the primes in the closed range [L, R]. If the range has no primes, print `-1` for First and Last.

**Input Format:** Two integers, one per line: L, then R.

**Output Format:** Four lines:
```
Count: <number of primes in [L, R]>
First: <smallest prime in range, or -1>
Last: <largest prime in range, or -1>
Next after R: <smallest prime greater than R>
```

**Constraints:** 1 ≤ L ≤ R ≤ 10000. 1 is not prime.

**Sample Input**
```
10
20
```
**Sample Output**
```
Count: 4
First: 11
Last: 19
Next after R: 23
```

**Test Cases**
```
# T1 (normal)
IN:
1
10
OUT:
Count: 4
First: 2
Last: 7
Next after R: 11

# T2 (no primes)
IN:
14
16
OUT:
Count: 0
First: -1
Last: -1
Next after R: 17

# T3 (only 1, not prime)
IN:
1
1
OUT:
Count: 0
First: -1
Last: -1
Next after R: 2

# T4 (no primes near the maximum)
IN:
9990
10000
OUT:
Count: 0
First: -1
Last: -1
Next after R: 10007

# T5 (single prime)
IN:
2
2
OUT:
Count: 1
First: 2
Last: 2
Next after R: 3

# T6 (full range)
IN:
1
10000
OUT:
Count: 1229
First: 2
Last: 9973
Next after R: 10007

# T7 (primes at both ends)
IN:
89
97
OUT:
Count: 2
First: 89
Last: 97
Next after R: 101

# T8 (first 100 numbers)
IN:
1
100
OUT:
Count: 25
First: 2
Last: 97
Next after R: 101
```

**Concepts Practiced:** Several cooperating functions, `Bool` return type, loops, early return, edge cases for 1 and 2.

---

# TOPIC 6: Multiple Return Values

## 6.1 Min and Max of Two
**Difficulty:** Easy

**Description:** Write `func minMax(a: Int64, b: Int64): (Int64, Int64)` that returns the smaller number first and the larger number second. Read two integers, call the function, and decompose the result into two variables.

**Input Format:** Two integers, one per line.

**Output Format:** Two lines:
```
Min: <smaller>
Max: <larger>
```

**Constraints:** -1,000,000,000 ≤ a, b ≤ 1,000,000,000

**Sample Input**
```
8
3
```
**Sample Output**
```
Min: 3
Max: 8
```

**Test Cases**
```
# T1 (negative and positive)
IN:
-5
5
OUT:
Min: -5
Max: 5

# T2 (equal)
IN:
4
4
OUT:
Min: 4
Max: 4

# T3 (extremes, a is smaller)
IN:
-1000000000
1000000000
OUT:
Min: -1000000000
Max: 1000000000

# T4 (extremes, a is larger)
IN:
1000000000
-1000000000
OUT:
Min: -1000000000
Max: 1000000000

# T5 (zero and negative)
IN:
0
-1
OUT:
Min: -1
Max: 0
```

**Concepts Practiced:** Tuple return type `(Int64, Int64)`, returning a tuple, tuple destructuring.

---

## 6.2 Quotient and Remainder
**Difficulty:** Easy

**Description:** Write `func divide(a: Int64, b: Int64): (Int64, Int64)` that returns the quotient and the remainder of a ÷ b. Read a and b, call the function, and print both.

**Input Format:** Two integers, one per line: a, then b.

**Output Format:** Two lines:
```
Quotient: <q>
Remainder: <r>
```

**Constraints:** 0 ≤ a ≤ 1,000,000,000, 1 ≤ b ≤ 1,000,000,000

**Sample Input**
```
20
6
```
**Sample Output**
```
Quotient: 3
Remainder: 2
```

**Test Cases**
```
# T1 (normal)
IN:
17
5
OUT:
Quotient: 3
Remainder: 2

# T2 (zero dividend)
IN:
0
7
OUT:
Quotient: 0
Remainder: 0

# T3 (divide by one)
IN:
1000000000
1
OUT:
Quotient: 1000000000
Remainder: 0

# T4 (dividend smaller)
IN:
5
10
OUT:
Quotient: 0
Remainder: 5

# T5 (exact division)
IN:
100
10
OUT:
Quotient: 10
Remainder: 0

# T6 (maximum divisor)
IN:
999999999
1000000000
OUT:
Quotient: 0
Remainder: 999999999
```

**Concepts Practiced:** Returning a tuple of two values, `/` and `%`, destructuring with `var (q, r) = ...`.

---

## 6.3 Rectangle Stats
**Difficulty:** Medium

**Description:** Write `func stats(w: Int64, h: Int64): (Int64, Int64, Int64)` that returns three values at once:
1. area
2. perimeter
3. diagonal squared (w² + h²)

Read the width and height, call the function once, and print the three values.

**Input Format:** Two integers, one per line: width, then height.

**Output Format:** Three lines:
```
Area: <area>
Perimeter: <perimeter>
Diagonal squared: <w*w + h*h>
```

**Constraints:** 0 ≤ w, h ≤ 1000

**Sample Input**
```
5
2
```
**Sample Output**
```
Area: 10
Perimeter: 14
Diagonal squared: 29
```

**Test Cases**
```
# T1 (3-4-5)
IN:
3
4
OUT:
Area: 12
Perimeter: 14
Diagonal squared: 25

# T2 (minimum)
IN:
0
0
OUT:
Area: 0
Perimeter: 0
Diagonal squared: 0

# T3 (maximum)
IN:
1000
1000
OUT:
Area: 1000000
Perimeter: 4000
Diagonal squared: 2000000

# T4 (long and thin)
IN:
1
10
OUT:
Area: 10
Perimeter: 22
Diagonal squared: 101

# T5 (square)
IN:
7
7
OUT:
Area: 49
Perimeter: 28
Diagonal squared: 98

# T6 (one side zero)
IN:
0
500
OUT:
Area: 0
Perimeter: 1000
Diagonal squared: 250000
```

**Concepts Practiced:** Three-element tuples, destructuring all three, one function computing several results.

---

## 6.4 Three-Number Analyzer
**Difficulty:** Medium

**Description:** Write `func analyze(a: Int64, b: Int64, c: Int64): (Int64, Int64, Int64)` that returns the minimum, maximum, and sum of the three numbers. In `main`, destructure the result. Then compute:
- the **range** (max − min), without using the sum
- the **average** (sum ÷ 3, integer division)

**Input Format:** Three integers, one per line.

**Output Format:** Five lines:
```
Min: <min>
Max: <max>
Sum: <sum>
Range: <max - min>
Average: <sum / 3>
```

**Constraints:** 0 ≤ each value ≤ 1000

**Sample Input**
```
2
8
5
```
**Sample Output**
```
Min: 2
Max: 8
Sum: 15
Range: 6
Average: 5
```

**Test Cases**
```
# T1 (normal)
IN:
10
20
30
OUT:
Min: 10
Max: 30
Sum: 60
Range: 20
Average: 20

# T2 (all zero)
IN:
0
0
0
OUT:
Min: 0
Max: 0
Sum: 0
Range: 0
Average: 0

# T3 (all equal)
IN:
5
5
5
OUT:
Min: 5
Max: 5
Sum: 15
Range: 0
Average: 5

# T4 (extremes)
IN:
1000
0
500
OUT:
Min: 0
Max: 1000
Sum: 1500
Range: 1000
Average: 500

# T5 (average drops decimals)
IN:
1
2
2
OUT:
Min: 1
Max: 2
Sum: 5
Range: 1
Average: 1

# T6 (maximum with a close value)
IN:
1000
1000
999
OUT:
Min: 999
Max: 1000
Sum: 2999
Range: 1
Average: 999

# T7 (unordered)
IN:
3
9
1
OUT:
Min: 1
Max: 9
Sum: 13
Range: 8
Average: 4
```

**Concepts Practiced:** Three-value tuple return, destructuring, the wildcard `_` to ignore a value, combining returned values.

---

## 6.5 Running Statistics
**Difficulty:** Hard

**Description:** Numbers arrive one at a time. Keep the running statistics in one tuple of five values: `(sum, min, max, evenCount, oddCount)`.

Write `func update(state: (Int64, Int64, Int64, Int64, Int64), x: Int64): (Int64, Int64, Int64, Int64, Int64)`. It takes the old state and the next number, and returns the new state.

Start from the first number (sum = min = max = first number, with its parity counted), then call `update` for each remaining number. Do not store the numbers in an array. A number is even if it is divisible by 2, otherwise odd.

**Input Format:** The first line is N. The next N lines each contain one integer.

**Output Format:** Five lines:
```
Sum: <sum>
Min: <min>
Max: <max>
Even count: <count>
Odd count: <count>
```

**Constraints:** 1 ≤ N ≤ 20, -1000 ≤ each number ≤ 1000

**Sample Input**
```
3
5
2
8
```
**Sample Output**
```
Sum: 15
Min: 2
Max: 8
Even count: 2
Odd count: 1
```

**Test Cases**
```
# T1 (mixed signs)
IN:
5
4
-2
7
10
-5
OUT:
Sum: 14
Min: -5
Max: 10
Even count: 3
Odd count: 2

# T2 (single number)
IN:
1
7
OUT:
Sum: 7
Min: 7
Max: 7
Even count: 0
Odd count: 1

# T3 (maximum N, values 1 to 20)
IN:
20
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
OUT:
Sum: 210
Min: 1
Max: 20
Even count: 10
Odd count: 10

# T4 (all negative odd)
IN:
3
-1
-3
-5
OUT:
Sum: -9
Min: -5
Max: -1
Even count: 0
Odd count: 3

# T5 (all zero)
IN:
4
0
0
0
0
OUT:
Sum: 0
Min: 0
Max: 0
Even count: 4
Odd count: 0

# T6 (extremes)
IN:
2
-1000
1000
OUT:
Sum: 0
Min: -1000
Max: 1000
Even count: 2
Odd count: 0
```

**Concepts Practiced:** Tuples as function parameters and return values, destructuring, state passed through a function, `while` loop reading input.

---

## Batch 1 progress

| Topics done | Problems so far | Easy | Medium | Hard |
|---|---|---|---|---|
| 1–6 of 10 | 30 of 50 | 12 | 12 | 6 |

Every expected output was computed by hand. This includes the prime counts (π(100) = 25, π(10000) = 1229, largest prime ≤ 10000 is 9973), 20¹², and the tribonacci-style values from Part A.

**Still to come:** Topics 7–10 (If Else, For and while loops, Range, Arrays), then Batches 2–6. Say "continue" and I'll send them.

---

# Cangjie CodeChum-Style Question Bank
## Batch 1, Part C: Topics 7–10 (20 problems)

**Continuation of the existing question bank.** This document completes Batch 1, Topics 7–10. Topics 1–6 are in the previously prepared parts; do not replace or renumber them.

## Batch 1 overview

| Topic | Lesson title | Problems |
|---|---|---:|
| 7 | If Else | 5 |
| 8 | For and while loops | 5 |
| 9 | Range | 5 |
| 10 | Arrays | 5 |
| **Total** | **Topics 7–10** | **20** |

**Difficulty distribution:** 8 Easy, 8 Medium, 4 Hard.  
**Total for Batch 1 after this part:** 10 topics, 50 problems.

## Shared setup and submission rules

- Write a standalone Cangjie program for each problem. Read from standard input and print only the required output.
- Do not print prompts such as `Enter a number:`.
- Unless a problem says otherwise, each input value is on its own line. Array inputs give `N` first, followed by `N` values, one per line.
- Use the Cangjie syntax taught in the corresponding lesson. The input-reading setup below comes from the earlier question-bank setup note (Console IO is introduced later in the course):

```cangjie
import std.console.*
import std.convert.*

main() {
    let line = Console.stdIn.readln().getOrThrow()
    let n = Int64.parse(line)
    println(n)
}
```

- `IN:` and `OUT:` blocks are test data, not program code.
- No solutions or algorithm walkthroughs are included.
- All output must match exactly, including capitalization, spaces, and line breaks.

---

# TOPIC 7: If Else

**Lesson focus:** `if`, `else`, `else if`, nested conditions, and logical operators `&&` and `||`.  
**Source:** https://cjpluk.github.io/learn/07-if-else/

## 7.1 Even or Odd
**Difficulty:** Easy

**Description:** A number-checking kiosk reads one integer and identifies whether it is even or odd. Print `Even` when the number is divisible by 2; otherwise, print `Odd`.

**Input Format:** One line containing an integer `N`.

**Output Format:** One line containing either `Even` or `Odd`.

**Constraints:** `-1,000,000,000 ≤ N ≤ 1,000,000,000`

**Sample Input**
```text
14
```

**Sample Output**
```text
Even
```

**Test Cases**

```text
# T1 - positive even
IN:
14
OUT:
Even

# T2 - positive odd
IN:
7
OUT:
Odd

# T3 - zero
IN:
0
OUT:
Even

# T4 - negative even
IN:
-8
OUT:
Even

# T5 - negative odd
IN:
-9
OUT:
Odd

**Concepts Practiced:** `if`/`else`, comparison, modulo operator `%`, integer input.

## 7.2 Age Group Classifier
**Difficulty:** Easy

**Description:** A community center classifies a visitor by age. Print `Child` for ages 0–12, `Teen` for ages 13–17, `Adult` for ages 18–59, and `Senior` for ages 60 and above.

**Input Format:** One line containing the visitor's age.

**Output Format:** One word: `Child`, `Teen`, `Adult`, or `Senior`.

**Constraints:** `0 ≤ age ≤ 120`

**Sample Input**
```text
18
```

**Sample Output**
```text
Adult
```

**Test Cases**
```text
# T1 - child
IN:
8
OUT:
Child

# T2 - upper child boundary
IN:
12
OUT:
Child

# T3 - teen lower boundary
IN:
13
OUT:
Teen

# T4 - adult upper boundary
IN:
59
OUT:
Adult

# T5 - senior lower boundary
IN:
60
OUT:
Senior
```

**Concepts Practiced:** `if`/`else if`/`else`, ordered conditions, integer comparisons.

## 7.3 Scholarship Eligibility
**Difficulty:** Medium

**Description:** A school checks whether a student qualifies for a scholarship. A student is `Eligible` only when their grade is at least 90 and their family monthly income is at most 30,000. Otherwise, print `Not Eligible`.

**Input Format:** Two lines:
1. Integer grade.
2. Integer monthly family income.

**Output Format:** One line: `Eligible` or `Not Eligible`.

**Constraints:**
- `0 ≤ grade ≤ 100`
- `0 ≤ income ≤ 1,000,000`

**Sample Input**
```text
95
25000
```

**Sample Output**
```text
Eligible
```

**Test Cases**
```text
# T1 - both requirements satisfied
IN:
95
25000
OUT:
Eligible

# T2 - grade below threshold
IN:
89
25000
OUT:
Not Eligible

# T3 - income above threshold
IN:
95
30001
OUT:
Not Eligible

# T4 - both values exactly at thresholds
IN:
90
30000
OUT:
Eligible

# T5 - both requirements fail
IN:
70
50000
OUT:
Not Eligible
```

**Concepts Practiced:** `&&`, `if`/`else`, combined Boolean conditions, boundary comparisons.

## 7.4 Delivery Fee Calculator
**Difficulty:** Medium

**Description:** An online store calculates delivery fees based on the order total and delivery distance. If the order total is at least 1,500, delivery is free. Otherwise, the fee is 50 when the distance is at most 5 km, and 100 when the distance is greater than 5 km. Print the delivery fee and final amount to pay.

**Input Format:** Two lines:
1. Integer order total.
2. Integer delivery distance in kilometers.

**Output Format:** Two lines:
```text
Delivery fee: <fee>
Total payment: <order total plus fee>
```

**Constraints:**
- `0 ≤ order total ≤ 1,000,000`
- `1 ≤ distance ≤ 100`

**Sample Input**
```text
1200
8
```

**Sample Output**
```text
Delivery fee: 100
Total payment: 1300
```

**Test Cases**
```text
# T1 - long distance, below free-delivery threshold
IN:
1200
8
OUT:
Delivery fee: 100
Total payment: 1300

# T2 - short distance, below threshold
IN:
1200
5
OUT:
Delivery fee: 50
Total payment: 1250

# T3 - exactly free-delivery threshold
IN:
1500
10
OUT:
Delivery fee: 0
Total payment: 1500

# T4 - zero order total
IN:
0
1
OUT:
Delivery fee: 50
Total payment: 50

# T5 - maximum order total
IN:
1000000
100
OUT:
Delivery fee: 0
Total payment: 1000000
```

**Concepts Practiced:** Nested `if`/`else`, `else if`, Boolean conditions, arithmetic, branching order.

## 7.5 Triangle and Type Analyzer
**Difficulty:** Hard

**Description:** Read three positive side lengths. First determine whether they can form a triangle. A triangle is valid only when the sum of any two sides is greater than the third side. If invalid, print only `Invalid Triangle`. If valid, classify it as `Equilateral` when all sides are equal, `Isosceles` when exactly two sides are equal, or `Scalene` when all sides differ. Also classify its largest side as `Long` if it is at least 10, otherwise `Short`.

**Input Format:** Three lines containing integer side lengths `A`, `B`, and `C`.

**Output Format:** For an invalid triangle, one line:
```text
Invalid Triangle
```
For a valid triangle, two lines:
```text
Type: <Equilateral/Isosceles/Scalene>
Largest side: <Long/Short>
```

**Constraints:** `1 ≤ A, B, C ≤ 1,000,000`

**Sample Input**
```text
5
5
8
```

**Sample Output**
```text
Type: Isosceles
Largest side: Short
```

**Test Cases**
```text
# T1 - valid scalene, largest side short
IN:
3
4
5
OUT:
Type: Scalene
Largest side: Short

# T2 - valid equilateral, long side
IN:
10
10
10
OUT:
Type: Equilateral
Largest side: Long

# T3 - valid isosceles
IN:
7
7
10
OUT:
Type: Isosceles
Largest side: Long

# T4 - invalid because two smaller sides sum to the largest
IN:
2
3
5
OUT:
Invalid Triangle

# T5 - invalid, largest side too long
IN:
1
2
10
OUT:
Invalid Triangle
```

**Concepts Practiced:** Nested conditions, multiple comparisons, `&&` and `||`, mutually exclusive classifications, boundary handling.

---

# TOPIC 8: For and while loops

**Lesson focus:** `while`, `for-in`, exclusive and inclusive ranges (`0..3`, `0..=3`), iterating over arrays and tuples, `where` filters, and `_` when the iterator value is unused.  
**Source:** https://cjpluk.github.io/learn/08-for-and-while/

## 8.1 Count from 1 to N
**Difficulty:** Easy

**Description:** Read a positive integer `N` and print every integer from 1 through `N`, separated by one space on a single line.

**Input Format:** One line containing integer `N`.

**Output Format:** One line containing `1` through `N`, separated by single spaces. Do not print a trailing space.

**Constraints:** `1 ≤ N ≤ 100`

**Sample Input**
```text
5
```

**Sample Output**
```text
1 2 3 4 5
```

**Test Cases**
```text
# T1 - ordinary sequence
IN:
5
OUT:
1 2 3 4 5

# T2 - minimum N
IN:
1
OUT:
1

# T3 - maximum N
IN:
100
OUT:
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100

# T4 - even boundary
IN:
2
OUT:
1 2

# T5 - small sequence
IN:
7
OUT:
1 2 3 4 5 6 7
```

**Concepts Practiced:** `for-in` or `while`, loop counters, inclusive iteration, controlled spacing.

## 8.2 Countdown
**Difficulty:** Easy

**Description:** A timer reads a starting number `N` and prints a countdown from `N` to 0. Print each number on its own line, followed by `Go!`.

**Input Format:** One line containing integer `N`.

**Output Format:** `N`, `N-1`, down to `0`, each on its own line, followed by `Go!`.

**Constraints:** `0 ≤ N ≤ 20`

**Sample Input**
```text
3
```

**Sample Output**
```text
3
2
1
0
Go!
```

**Test Cases**
```text
# T1 - ordinary countdown
IN:
3
OUT:
3
2
1
0
Go!

# T2 - zero
IN:
0
OUT:
0
Go!

# T3 - maximum
IN:
20
OUT:
20
19
18
17
16
15
14
13
12
11
10
9
8
7
6
5
4
3
2
1
0
Go!

# T4 - one
IN:
1
OUT:
1
0
Go!

# T5 - middle value
IN:
10
OUT:
10
9
8
7
6
5
4
3
2
1
0
Go!
```

**Concepts Practiced:** `while`, decrementing a mutable variable, loop termination, sequential output.

## 8.3 Sum of Multiples
**Difficulty:** Medium

**Description:** Read two integers `N` and `K`. Calculate the sum of all positive multiples of `K` from 1 through `N`. If there are no such multiples, the sum is 0.

**Input Format:** Two lines:
1. Integer `N`.
2. Positive integer `K`.

**Output Format:** One line: `Sum: <sum>`.

**Constraints:**
- `1 ≤ N ≤ 100,000`
- `1 ≤ K ≤ 10,000`

**Sample Input**
```text
10
3
```

**Sample Output**
```text
Sum: 18
```

**Test Cases**
```text
# T1 - multiples 3 and 6 and 9
IN:
10
3
OUT:
Sum: 18

# T2 - K greater than N
IN:
5
8
OUT:
Sum: 0

# T3 - every number is a multiple
IN:
5
1
OUT:
Sum: 15

# T4 - only one multiple
IN:
10
10
OUT:
Sum: 10

# T5 - larger range
IN:
100
10
OUT:
Sum: 550
```

**Concepts Practiced:** `for-in` or `while`, loop accumulation, `%`, conditional filtering.

## 8.4 Filtered Number Report
**Difficulty:** Medium

**Description:** Read an integer `N`. Examine every integer from 1 through `N`. Print the numbers divisible by 2 or 3, then print how many numbers were printed and their sum. Each selected number must appear once even if it is divisible by both 2 and 3.

**Input Format:** One line containing integer `N`.

**Output Format:** Three lines:
```text
Numbers: <selected numbers separated by one space>
Count: <count>
Sum: <sum>
```
If no number is selected, the first line must be `Numbers: None`.

**Constraints:** `1 ≤ N ≤ 1,000`

**Sample Input**
```text
6
```

**Sample Output**
```text
Numbers: 2 3 4 6
Count: 4
Sum: 15
```

**Test Cases**
```text
# T1 - includes a value divisible by both
IN:
6
OUT:
Numbers: 2 3 4 6
Count: 4
Sum: 15

# T2 - no selected values
IN:
1
OUT:
Numbers: None
Count: 0
Sum: 0

# T3 - all values from 1 to 3
IN:
3
OUT:
Numbers: 2 3
Count: 2
Sum: 5

# T4 - multiple selected values
IN:
10
OUT:
Numbers: 2 3 4 6 8 9 10
Count: 7
Sum: 42

# T5 - larger range
IN:
30
OUT:
Numbers: 2 3 4 6 8 9 10 12 14 15 16 18 20 21 22 24 26 27 28 30
Count: 20
Sum: 315
```

**Concepts Practiced:** `for-in`, `where`-style filtering or `if` inside a loop, `||`, avoiding duplicate counting, accumulation, output formatting.

## 8.5 Repeated Transformation
**Difficulty:** Hard

**Description:** Read three integers `A`, `B`, and `C`, followed by a non-negative number of steps `K`. For each step, update all three values simultaneously using the old values:
- new A = old A + old B
- new B = old B + old C
- new C = old C + old A

After `K` steps, print the three final values separated by spaces.

**Input Format:** Four lines: `A`, `B`, `C`, and `K`.

**Output Format:** One line: `<A> <B> <C>`.

**Constraints:**
- `-100 ≤ A, B, C ≤ 100`
- `0 ≤ K ≤ 20`
- All intermediate results fit in `Int64`.

**Sample Input**
```text
1
2
3
2
```

**Sample Output**
```text
8 9 7
```

**Test Cases**
```text
# T1 - two steps
IN:
1
2
3
2
OUT:
8 9 7

# T2 - zero steps
IN:
4
5
6
0
OUT:
4 5 6

# T3 - one step
IN:
1
2
3
1
OUT:
3 5 4

# T4 - negative values
IN:
-1
-2
-3
1
OUT:
-3 -5 -4

# T5 - all zero
IN:
0
0
0
20
OUT:
0 0 0
```

**Concepts Practiced:** `while` or `for-in`, mutable variables, preserving old values during simultaneous updates, repeated state transitions.

---

# TOPIC 9: Range

**Lesson focus:** `Range<T>`, range literals, inclusive and exclusive endpoints (`..`, `..=`), explicit step syntax (`: step`), descending ranges, and iterating through ranges.  
**Source:** https://cjpluk.github.io/learn/09-range/

## 9.1 Inclusive Number Sequence
**Difficulty:** Easy

**Description:** Read two integers `A` and `B` where `A ≤ B`. Print every integer from `A` through `B`, separated by one space.

**Input Format:** Two lines containing `A` and `B`.

**Output Format:** One line containing all integers from `A` to `B`, inclusive, separated by single spaces. Do not print a trailing space.

**Constraints:** `-100 ≤ A ≤ B ≤ 100`

**Sample Input**
```text
3
6
```

**Sample Output**
```text
3 4 5 6
```

**Test Cases**
```text
# T1 - positive range
IN:
3
6
OUT:
3 4 5 6

# T2 - single-value range
IN:
5
5
OUT:
5

# T3 - range including zero
IN:
-2
2
OUT:
-2 -1 0 1 2

# T4 - negative range
IN:
-5
-2
OUT:
-5 -4 -3 -2

# T5 - maximum bounds
IN:
95
100
OUT:
95 96 97 98 99 100
```

**Concepts Practiced:** Range literals, inclusive endpoint `..=`, `for-in`, sequence output.

## 9.2 Countdown by a Step
**Difficulty:** Easy

**Description:** Read a starting number `N` and a positive step `S`. Print the descending sequence beginning at `N`, subtracting `S` each time, and stop before the next value would become negative. Include zero only if the sequence reaches it exactly.

**Input Format:** Two lines: `N` and `S`.

**Output Format:** One line containing the sequence, separated by single spaces.

**Constraints:** `0 ≤ N ≤ 1,000`, `1 ≤ S ≤ 100`

**Sample Input**
```text
10
3
```

**Sample Output**
```text
10 7 4 1
```

**Test Cases**
```text
# T1 - step does not land on zero
IN:
10
3
OUT:
10 7 4 1

# T2 - reaches zero exactly
IN:
12
3
OUT:
12 9 6 3 0

# T3 - step larger than start
IN:
2
5
OUT:
2

# T4 - zero start
IN:
0
1
OUT:
0

# T5 - step of one
IN:
5
1
OUT:
5 4 3 2 1 0
```

**Concepts Practiced:** Descending range with negative step, inclusive endpoints, range iteration.

## 9.3 Sum Every Second Number
**Difficulty:** Medium

**Description:** Read `A` and `B` where `A ≤ B`. Calculate the sum of values beginning at `A` and increasing by 2, stopping at the last value that does not exceed `B`.

**Input Format:** Two lines containing `A` and `B`.

**Output Format:** One line: `Sum: <sum>`.

**Constraints:** `-1,000 ≤ A ≤ B ≤ 1,000`

**Sample Input**
```text
1
8
```

**Sample Output**
```text
Sum: 16
```

**Test Cases**
```text
# T1 - odd sequence
IN:
1
8
OUT:
Sum: 16

# T2 - even sequence
IN:
2
8
OUT:
Sum: 20

# T3 - one value
IN:
4
4
OUT:
Sum: 4

# T4 - negative through positive
IN:
-3
3
OUT:
Sum: 0

# T5 - negative-only sequence
IN:
-8
-2
OUT:
Sum: -20
```

**Concepts Practiced:** Range with step, `for-in`, accumulation, inclusive endpoint behavior.

## 9.4 Multiplication Table for a Range
**Difficulty:** Medium

**Description:** Read an integer `N` and print its multiplication table for multipliers 1 through 10. Use an inclusive range to visit all ten multipliers.

**Input Format:** One integer `N`.

**Output Format:** Ten lines in this exact format:
```text
N x 1 = result
...
N x 10 = result
```

**Constraints:** `-100 ≤ N ≤ 100`

**Sample Input**
```text
7
```

**Sample Output**
```text
7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
7 x 4 = 28
7 x 5 = 35
7 x 6 = 42
7 x 7 = 49
7 x 8 = 56
7 x 9 = 63
7 x 10 = 70
```

**Test Cases**
```text
# T1 - positive number
IN:
7
OUT:
7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
7 x 4 = 28
7 x 5 = 35
7 x 6 = 42
7 x 7 = 49
7 x 8 = 56
7 x 9 = 63
7 x 10 = 70

# T2 - zero
IN:
0
OUT:
0 x 1 = 0
0 x 2 = 0
0 x 3 = 0
0 x 4 = 0
0 x 5 = 0
0 x 6 = 0
0 x 7 = 0
0 x 8 = 0
0 x 9 = 0
0 x 10 = 0

# T3 - negative number
IN:
-3
OUT:
-3 x 1 = -3
-3 x 2 = -6
-3 x 3 = -9
-3 x 4 = -12
-3 x 5 = -15
-3 x 6 = -18
-3 x 7 = -21
-3 x 8 = -24
-3 x 9 = -27
-3 x 10 = -30

# T4 - one
IN:
1
OUT:
1 x 1 = 1
1 x 2 = 2
1 x 3 = 3
1 x 4 = 4
1 x 5 = 5
1 x 6 = 6
1 x 7 = 7
1 x 8 = 8
1 x 9 = 9
1 x 10 = 10

# T5 - upper constraint
IN:
100
OUT:
100 x 1 = 100
100 x 2 = 200
100 x 3 = 300
100 x 4 = 400
100 x 5 = 500
100 x 6 = 600
100 x 7 = 700
100 x 8 = 800
100 x 9 = 900
100 x 10 = 1000
```

**Concepts Practiced:** Inclusive range, `for-in`, multiplication, formatted output.

## 9.5 Range Statistics
**Difficulty:** Hard

**Description:** Read `START`, `END`, and `STEP`. Generate the arithmetic sequence beginning at `START`, repeatedly adding `STEP`, and stop before passing `END`. The step is always positive and `START ≤ END`. Calculate the number of generated values, their sum, and the final generated value.

**Input Format:** Three lines containing `START`, `END`, and `STEP`.

**Output Format:** Three lines:
```text
Count: <count>
Sum: <sum>
Last: <last value>
```

**Constraints:**
- `-10,000 ≤ START ≤ END ≤ 10,000`
- `1 ≤ STEP ≤ 1,000`

**Sample Input**
```text
2
10
3
```

**Sample Output**
```text
Count: 3
Sum: 15
Last: 8
```

**Test Cases**
```text
# T1 - step does not land on endpoint
IN:
2
10
3
OUT:
Count: 3
Sum: 15
Last: 8

# T2 - step lands on endpoint
IN:
1
10
3
OUT:
Count: 4
Sum: 22
Last: 10

# T3 - one generated value
IN:
5
5
7
OUT:
Count: 1
Sum: 5
Last: 5

# T4 - negative start
IN:
-8
2
2
OUT:
Count: 6
Sum: -18
Last: 2

# T5 - maximum span, step 1000
IN:
-10000
10000
1000
OUT:
Count: 21
Sum: 0
Last: 10000
```

**Concepts Practiced:** Explicit range step, inclusive endpoint, iteration, accumulation, count tracking, boundary conditions.

---

# TOPIC 10: Arrays

**Lesson focus:** `Array<T>`, typed array declarations, array initialization with a repeated value or lambda expression, `.size`, indexing, slicing, and array iteration.  
**Source:** https://cjpluk.github.io/learn/10-arrays/

## 10.1 Array Total
**Difficulty:** Easy

**Description:** Read `N` integers into an integer array and calculate their total sum.

**Input Format:**
- First line: integer `N`.
- Next `N` lines: one integer per line.

**Output Format:** One line: `Sum: <sum>`.

**Constraints:**
- `1 ≤ N ≤ 100`
- `-1,000 ≤ each value ≤ 1,000`

**Sample Input**
```text
4
3
5
-2
4
```

**Sample Output**
```text
Sum: 10
```

**Test Cases**
```text
# T1 - mixed values
IN:
4
3
5
-2
4
OUT:
Sum: 10

# T2 - one element
IN:
1
7
OUT:
Sum: 7

# T3 - all zero
IN:
5
0
0
0
0
0
OUT:
Sum: 0

# T4 - all negative
IN:
3
-2
-3
-5
OUT:
Sum: -10

# T5 - maximum number of values
IN:
10
1
2
3
4
5
6
7
8
9
10
OUT:
Sum: 55
```

**Concepts Practiced:** `Array<Int64>`, array initialization, indexed assignment, `.size`, array traversal, accumulation.

## 10.2 Largest Array Element
**Difficulty:** Easy

**Description:** Read `N` integers into an array and print the largest value.

**Input Format:**
- First line: integer `N`.
- Next `N` lines: one integer per line.

**Output Format:** One line: `Largest: <value>`.

**Constraints:**
- `1 ≤ N ≤ 100`
- `-100,000 ≤ each value ≤ 100,000`

**Sample Input**
```text
5
4
9
-2
7
1
```

**Sample Output**
```text
Largest: 9
```

**Test Cases**
```text
# T1 - mixed values
IN:
5
4
9
-2
7
1
OUT:
Largest: 9

# T2 - one element
IN:
1
-15
OUT:
Largest: -15

# T3 - all negative
IN:
4
-9
-2
-30
-5
OUT:
Largest: -2

# T4 - repeated maximum
IN:
5
8
8
1
8
3
OUT:
Largest: 8

# T5 - maximum allowed values
IN:
3
-100000
100000
0
OUT:
Largest: 100000
```

**Concepts Practiced:** Array declaration, indexing, iteration, comparisons, tracking a current maximum.

## 10.3 Count Values Above Average
**Difficulty:** Medium

**Description:** Read `N` integers into an array. Calculate the arithmetic average, then count how many array elements are strictly greater than that average. To avoid floating-point formatting, compare each value multiplied by `N` against the total sum. Print the average to exactly two decimal places and the count.

**Input Format:**
- First line: integer `N`.
- Next `N` lines: one integer per line.

**Output Format:**
```text
Average: <average to 2 decimal places>
Above average: <count>
```

**Constraints:**
- `1 ≤ N ≤ 100`
- `-1,000 ≤ each value ≤ 1,000`

**Sample Input**
```text
4
1
2
3
4
```

**Sample Output**
```text
Average: 2.50
Above average: 2
```

**Test Cases**
```text
# T1 - two values above average
IN:
4
1
2
3
4
OUT:
Average: 2.50
Above average: 2

# T2 - all equal
IN:
3
5
5
5
OUT:
Average: 5.00
Above average: 0

# T3 - negative average
IN:
3
-5
-2
-2
OUT:
Average: -3.00
Above average: 2

# T4 - average is a whole number
IN:
4
1
3
5
7
OUT:
Average: 4.00
Above average: 2

# T5 - one element
IN:
1
-9
OUT:
Average: -9.00
Above average: 0
```

**Concepts Practiced:** Array traversal, sum accumulation, `.size`, comparisons, derived calculations.  
**Formatting note:** Use a verified Cangjie formatting method for two decimal places in your environment; do not assume an unverified formatting API.

## 10.4 Reverse an Array
**Difficulty:** Medium

**Description:** Read `N` integers into an array. Print the elements in reverse order on one line, separated by single spaces. Do not modify the required input order for any later calculation; the only required output is the reversed sequence.

**Input Format:**
- First line: integer `N`.
- Next `N` lines: one integer per line.

**Output Format:** One line containing the array elements from last to first, separated by one space.

**Constraints:**
- `1 ≤ N ≤ 100`
- `-1,000 ≤ each value ≤ 1,000`

**Sample Input**
```text
5
10
20
30
40
50
```

**Sample Output**
```text
50 40 30 20 10
```

**Test Cases**
```text
# T1 - ordinary array
IN:
5
10
20
30
40
50
OUT:
50 40 30 20 10

# T2 - one element
IN:
1
7
OUT:
7

# T3 - negative values
IN:
4
-1
-2
-3
-4
OUT:
-4 -3 -2 -1

# T4 - repeated values
IN:
5
2
2
3
2
2
OUT:
2 2 3 2 2

# T5 - mixed signs and zero
IN:
6
-5
0
8
-2
10
1
OUT:
1 10 -2 8 0 -5
```

**Concepts Practiced:** Array indexing, `.size`, reverse traversal, controlled output spacing.

## 10.5 Array Slice Analyzer
**Difficulty:** Hard

**Description:** Read an array of `N` integers, followed by two valid zero-based indices `L` and `R`, where `L < R` and `R` is at most `N`. Analyze the half-open slice from index `L` up to but not including index `R` (the same endpoint behavior demonstrated by the lesson's `d[1..3]` example). Print the slice, its sum, and its length.

**Input Format:**
- First line: integer `N`.
- Next `N` lines: one integer per line.
- Next line: integer `L`.
- Final line: integer `R`.

**Output Format:** Three lines:
```text
Slice: <slice values separated by one space>
Sum: <slice sum>
Length: <slice length>
```

**Constraints:**
- `2 ≤ N ≤ 100`
- `-1,000 ≤ each value ≤ 1,000`
- `0 ≤ L < R ≤ N`

**Sample Input**
```text
5
4
8
2
9
6
1
4
```

**Sample Output**
```text
Slice: 8 2 9
Sum: 19
Length: 3
```

**Test Cases**
```text
# T1 - middle slice
IN:
5
4
8
2
9
6
1
4
OUT:
Slice: 8 2 9
Sum: 19
Length: 3

# T2 - first element only
IN:
3
7
8
9
0
1
OUT:
Slice: 7
Sum: 7
Length: 1

# T3 - slice reaches the final element
IN:
4
1
2
3
4
2
4
OUT:
Slice: 3 4
Sum: 7
Length: 2

# T4 - full array slice
IN:
4
-2
0
5
-1
0
4
OUT:
Slice: -2 0 5 -1
Sum: 2
Length: 4

# T5 - negative values in a middle slice
IN:
6
10
-5
-4
-3
20
30
1
4
OUT:
Slice: -5 -4 -3
Sum: -12
Length: 3
```

**Concepts Practiced:** `Array<T>`, indexing, `.size`, array slicing with `[L..R]`, iterating over a slice, accumulation, valid index boundaries.

---

## Batch 1, Part C completion summary

| Measure | Result |
|---|---:|
| Topics completed in this part | 4 (Topics 7–10) |
| Problems in this part | 20 |
| Easy | 8 |
| Medium | 8 |
| Hard | 4 |
| Test cases per problem | 5 |
| Solutions included | 0 |

## Batch 1 completion summary

| Measure | Result |
|---|---:|
| Topics completed | 10 of 10 |
| Problems completed | 50 of 50 |
| Easy | 20 |
| Medium | 20 |
| Hard | 10 |
| Minimum test cases per problem | 5 |

**Batch 1 is now complete: Topics 1–10.** This file is the continuation for Topics 7–10; combine it with the existing Parts A and B to keep the complete 50-problem Batch 1 question bank together.

## Notes for the AI coding agent

1. Preserve all problem statements, constraints, sample data, and test cases. Do not silently rewrite or omit them.
2. Do not generate solutions unless the learner explicitly asks for a hint, explanation, or solution.
3. When evaluating a submitted Cangjie solution, compile it with the available Cangjie compiler if possible, run every supplied test case, and report compilation errors separately from logic errors.
4. Do not assume APIs or syntax not taught in the lesson. If a problem requires a library or formatting feature not covered in the lesson, verify it against official Cangjie documentation before recommending it.
5. Flag any suspected inconsistency in a test case instead of silently changing the expected output.
6. For Topic 10.3, verify the local compiler's supported float formatting approach before implementing the exact two-decimal output requirement.
