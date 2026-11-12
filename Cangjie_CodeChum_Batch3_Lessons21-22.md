# Cangjie CodeChum-Style Question Bank — Batch 3 (Lessons 21–22)

> Derived from the supplied `CangChum_2D_Arrays_and_OOP_Problems.md` bank.
> Format matches Batch 1 and Batch 2 so `data/build-curriculum.mjs` can parse it.
> Difficulty ranges were mapped to the app scale: Easy–Medium → Medium, Medium–Hard → Hard.

# TOPIC 21: 2D Arrays

## 21.1 A1. Matrix Sum
**Difficulty:** Easy

**Description:** Read an integer `N`, followed by an `N × N` matrix. Calculate the sum of all elements in the matrix.

**Input Format:** - First line: integer `N`.
- Next `N` lines: `N` space-separated integers per line.

**Output Format:** Print `Sum: X`, where `X` is the sum of all matrix elements.

**Constraints:**

- `1 ≤ N ≤ 100`
- `-10,000 ≤ element ≤ 10,000`

**Sample Input**
```
3
1 2 3
4 5 6
7 8 9
```
**Sample Output**
```
Sum: 45
```

**Test Cases**
```
# T1
IN:
3
1 2 3
4 5 6
7 8 9
OUT:
Sum: 45
# T2
IN:
1
-7
OUT:
Sum: -7
# T3
IN:
2
-1 5
3 -2
OUT:
Sum: 5
# T4
IN:
2
0 0
0 0
OUT:
Sum: 0
# T5
IN:
3
10000 -10000 1
-5 5 9
2 3 -4
OUT:
Sum: 11
```
**Concepts Practiced:** 2D array initialization, nested loops, accumulation, reading matrix rows.

## 21.2 A2. Sum of Each Row
**Difficulty:** Easy

**Description:** Read an `R × C` matrix. Calculate the sum of each row and print the result in row order.

**Input Format:** - First line: `R C`.
- Next `R` lines: `C` space-separated integers per line.

**Output Format:** For each row `i`, print `Row i: sum`.

**Constraints:**

- `1 ≤ R, C ≤ 100`
- `-10,000 ≤ element ≤ 10,000`

**Sample Input**
```
3 4
1 2 3 4
5 0 -1 2
7 8 9 1
```
**Sample Output**
```
Row 0: 10
Row 1: 6
Row 2: 25
```

**Test Cases**
```
# T1
IN:
3 4
1 2 3 4
5 0 -1 2
7 8 9 1
OUT:
Row 0: 10
Row 1: 6
Row 2: 25
# T2
IN:
1 3
4 5 6
OUT:
Row 0: 15
# T3
IN:
2 2
-3 -2
8 -1
OUT:
Row 0: -5
Row 1: 7
# T4
IN:
3 1
9
0
-4
OUT:
Row 0: 9
Row 1: 0
Row 2: -4
# T5
IN:
2 3
10000 10000 10000
-10000 -10000 5
OUT:
Row 0: 30000
Row 1: -19995
```
**Concepts Practiced:** Rectangular 2D arrays, row traversal, nested loops, accumulators.

## 21.3 A3. Sum of Each Column
**Difficulty:** Easy

**Description:** Read an `R × C` matrix. Calculate the sum of each column and print the result from the first column to the last.

**Input Format:** - First line: `R C`.
- Next `R` lines: `C` space-separated integers per line.

**Output Format:** For each column `j`, print `Column j: sum`.

**Constraints:**

- `1 ≤ R, C ≤ 100`
- `-10,000 ≤ element ≤ 10,000`

**Sample Input**
```
3 3
1 2 3
4 5 6
7 8 9
```
**Sample Output**
```
Column 0: 12
Column 1: 15
Column 2: 18
```

**Test Cases**
```
# T1
IN:
3 3
1 2 3
4 5 6
7 8 9
OUT:
Column 0: 12
Column 1: 15
Column 2: 18
# T2
IN:
1 3
4 5 6
OUT:
Column 0: 4
Column 1: 5
Column 2: 6
# T3
IN:
3 1
2
-3
8
OUT:
Column 0: 7
# T4
IN:
2 2
-1 -2
-3 -4
OUT:
Column 0: -4
Column 1: -6
# T5
IN:
2 4
1 0 2 0
3 4 5 6
OUT:
Column 0: 4
Column 1: 4
Column 2: 7
Column 3: 6
```
**Concepts Practiced:** Column traversal, fixing the column index while changing the row index, rectangular arrays.

## 21.4 A4. Row and Column Averages
**Difficulty:** Easy

**Description:** Read an `R × C` matrix. Print the integer average of each row, followed by the integer average of each column. Integer division truncates toward zero.

**Input Format:** - First line: `R C`.
- Next `R` lines: `C` space-separated integers per line.

**Output Format:** First print each row average as `Row i Average: value`. Then print each column average as `Column j Average: value`.

**Constraints:**

- `1 ≤ R, C ≤ 100`
- `-10,000 ≤ element ≤ 10,000`

**Sample Input**
```
2 3
2 4 6
4 6 8
```
**Sample Output**
```
Row 0 Average: 4
Row 1 Average: 6
Column 0 Average: 3
Column 1 Average: 5
Column 2 Average: 7
```

**Test Cases**
```
# T1
IN:
2 3
2 4 6
4 6 8
OUT:
Row 0 Average: 4
Row 1 Average: 6
Column 0 Average: 3
Column 1 Average: 5
Column 2 Average: 7
# T2
IN:
1 1
9
OUT:
Row 0 Average: 9
Column 0 Average: 9
# T3
IN:
2 2
1 2
2 3
OUT:
Row 0 Average: 1
Row 1 Average: 2
Column 0 Average: 1
Column 1 Average: 2
# T4
IN:
2 3
-2 -4 -6
1 2 3
OUT:
Row 0 Average: -4
Row 1 Average: 2
Column 0 Average: 0
Column 1 Average: -1
Column 2 Average: -1
# T5
IN:
3 2
10 20
20 30
30 40
OUT:
Row 0 Average: 15
Row 1 Average: 25
Row 2 Average: 35
Column 0 Average: 20
Column 1 Average: 30
```
**Concepts Practiced:** Row and column traversal, integer division, accumulators, rectangular matrices.

## 21.5 A5. Main and Secondary Diagonal Sums
**Difficulty:** Easy

**Description:** Read an `N × N` square matrix. Calculate the sum of its main diagonal and secondary diagonal.

The main diagonal runs from the top-left to the bottom-right. The secondary diagonal runs from the top-right to the bottom-left. For an odd-sized matrix, the center element belongs to both diagonal sums.

**Input Format:** - First line: integer `N`.
- Next `N` lines: `N` space-separated integers per line.

**Output Format:** Main Diagonal: X
Secondary Diagonal: Y

**Constraints:**

- `1 ≤ N ≤ 100`
- `-10,000 ≤ element ≤ 10,000`

**Sample Input**
```
3
1 2 3
4 5 6
7 8 9
```
**Sample Output**
```
Main Diagonal: 15
Secondary Diagonal: 15
```

**Test Cases**
```
# T1
IN:
3
1 2 3
4 5 6
7 8 9
OUT:
Main Diagonal: 15
Secondary Diagonal: 15
# T2
IN:
1
8
OUT:
Main Diagonal: 8
Secondary Diagonal: 8
# T3
IN:
2
1 2
3 4
OUT:
Main Diagonal: 5
Secondary Diagonal: 5
# T4
IN:
3
-1 0 2
4 5 6
7 8 -9
OUT:
Main Diagonal: -5
Secondary Diagonal: 14
# T5
IN:
4
1 0 0 2
0 3 4 0
0 5 6 0
7 0 0 8
OUT:
Main Diagonal: 18
Secondary Diagonal: 18
```
**Concepts Practiced:** Square matrices, diagonal indexing, `arr[i][i]`, `arr[i][N - 1 - i]`.

## 21.6 A6. Find the Largest Element and Its Position
**Difficulty:** Easy

**Description:** Read an `R × C` matrix. Find the largest value and print its zero-based row and column position. If the largest value appears more than once, print the position of its first occurrence in row-major order.

**Input Format:** - First line: `R C`.
- Next `R` lines: `C` space-separated integers per line.

**Output Format:** Maximum: value
Position: [row][column]

**Constraints:**

- `1 ≤ R, C ≤ 100`
- `-1,000,000 ≤ element ≤ 1,000,000`

**Sample Input**
```
2 3
4 9 2
7 9 1
```
**Sample Output**
```
Maximum: 9
Position: [0][1]
```

**Test Cases**
```
# T1
IN:
2 3
4 9 2
7 9 1
OUT:
Maximum: 9
Position: [0][1]
# T2
IN:
1 1
-5
OUT:
Maximum: -5
Position: [0][0]
# T3
IN:
2 2
-8 -3
-4 -9
OUT:
Maximum: -3
Position: [0][1]
# T4
IN:
3 2
5 5
5 5
5 5
OUT:
Maximum: 5
Position: [0][0]
# T5
IN:
3 3
1 2 3
4 15 6
7 8 9
OUT:
Maximum: 15
Position: [1][1]
```
**Concepts Practiced:** Searching, maximum tracking, row-major traversal, position tracking.

## 21.7 A7. Count Target Occurrences
**Difficulty:** Medium

**Description:** Read an `R × C` matrix and a target integer `T`. Count how many times `T` appears in the matrix.

**Input Format:** - First line: `R C`.
- Next `R` lines: `C` space-separated integers per line.
- Last line: target integer `T`.

**Output Format:** Print `Occurrences: X`.

**Constraints:**

- `1 ≤ R, C ≤ 100`
- `-10,000 ≤ element, T ≤ 10,000`

**Sample Input**
```
3 3
5 2 5
1 5 3
5 4 2
5
```
**Sample Output**
```
Occurrences: 4
```

**Test Cases**
```
# T1
IN:
3 3
5 2 5
1 5 3
5 4 2
5
OUT:
Occurrences: 4
# T2
IN:
2 2
1 2
3 4
9
OUT:
Occurrences: 0
# T3
IN:
1 4
7 7 7 7
7
OUT:
Occurrences: 4
# T4
IN:
2 3
-1 0 -1
2 -1 3
-1
OUT:
Occurrences: 3
# T5
IN:
3 1
0
1
0
0
OUT:
Occurrences: 2
```
**Concepts Practiced:** Nested loops, equality comparison, counters, target searching.

## 21.8 A8. Matrix Transpose
**Difficulty:** Medium

**Description:** Read an `R × C` matrix and print its transpose. The transpose changes the matrix dimensions to `C × R`; element at original position `[i][j]` appears at transposed position `[j][i]`.

**Input Format:** - First line: `R C`.
- Next `R` lines: `C` space-separated integers per line.

**Output Format:** Print the transposed matrix, one row per line, with single spaces between values and no trailing spaces.

**Constraints:**

- `1 ≤ R, C ≤ 100`
- `-10,000 ≤ element ≤ 10,000`

**Sample Input**
```
2 3
1 2 3
4 5 6
```
**Sample Output**
```
1 4
2 5
3 6
```

**Test Cases**
```
# T1
IN:
2 3
1 2 3
4 5 6
OUT:
1 4
2 5
3 6
# T2
IN:
1 3
7 8 9
OUT:
7
8
9
# T3
IN:
3 1
2
4
6
OUT:
2 4 6
# T4
IN:
2 2
-1 0
5 3
OUT:
-1 5
0 3
# T5
IN:
3 2
1 2
3 4
5 6
OUT:
1 3 5
2 4 6
```
**Concepts Practiced:** Rectangular arrays, swapped indices, output formatting, nested loops.

## 21.9 A9. Matrix Addition
**Difficulty:** Medium

**Description:** Read two matrices with the same dimensions `R × C`. Add corresponding elements and print the resulting matrix.

**Input Format:** - First line: `R C`.
- Next `R` lines: first matrix.
- Next `R` lines: second matrix.
- Each matrix row contains `C` space-separated integers.

**Output Format:** Print the resulting matrix, one row per line, with single spaces between values and no trailing spaces.

**Constraints:**

- `1 ≤ R, C ≤ 100`
- `-10,000 ≤ element ≤ 10,000`

**Sample Input**
```
2 2
1 2
3 4
5 6
7 8
```
**Sample Output**
```
6 8
10 12
```

**Test Cases**
```
# T1
IN:
2 2
1 2
3 4
5 6
7 8
OUT:
6 8
10 12
# T2
IN:
1 1
-3
8
OUT:
5
# T3
IN:
2 3
1 0 -1
2 3 4
-1 5 1
0 -3 6
OUT:
0 5 0
2 0 10
# T4
IN:
3 1
1
2
3
4
5
6
OUT:
5
7
9
# T5
IN:
1 4
10000 -10000 7 0
-10000 10000 -7 1
OUT:
0 0 0 1
```
**Concepts Practiced:** Multiple 2D arrays, corresponding element access, matrix arithmetic.

## 21.10 A10. Matrix Multiplication
**Difficulty:** Hard

**Description:** Read two matrices, `A` with dimensions `R × K` and `B` with dimensions `K × C`. Calculate their product `P = A × B`.

Each result element is calculated by multiplying a row of `A` by a column of `B` and adding the products.

**Input Format:** - First line: `R K C`.
- Next `R` lines: matrix A, each with `K` integers.
- Next `K` lines: matrix B, each with `C` integers.

**Output Format:** Print the resulting `R × C` matrix, one row per line, with single spaces between values and no trailing spaces.

**Constraints:**

- `1 ≤ R, K, C ≤ 30`
- `-100 ≤ element ≤ 100`

**Sample Input**
```
2 3 2
1 2 3
4 5 6
7 8
9 10
11 12
```
**Sample Output**
```
58 64
139 154
```

**Test Cases**
```
# T1
IN:
2 3 2
1 2 3
4 5 6
7 8
9 10
11 12
OUT:
58 64
139 154
# T2
IN:
1 1 1
5
4
OUT:
20
# T3
IN:
2 2 2
1 0
0 1
3 4
5 6
OUT:
3 4
5 6
# T4
IN:
2 2 3
1 2
3 4
1 2 3
4 5 6
OUT:
9 12 15
19 26 33
# T5
IN:
2 2 1
1 -1
2 3
4
-2
OUT:
6
2
```
**Concepts Practiced:** Three nested loops, compatible matrix dimensions, multiplication and accumulation.

# TOPIC 22: Object-Oriented Programming

## 22.1 B1. Student Record
**Difficulty:** Easy

**Description:** Create a `Student` class with a name and three integer grades. The class must provide a method that calculates the student's average grade.

Read the student's name and three grades. Create a `Student` object and display the name and average. The average is printed with exactly two digits after the decimal point.

**Input Format:** - First line: student name (one word).
- Second line: three space-separated integer grades.

**Output Format:** Student: name
Average: xx.xx

**Constraints:**

- `1 ≤ name length ≤ 30`
- `0 ≤ grade ≤ 100`

**Sample Input**
```
Mika
90 85 95
```
**Sample Output**
```
Student: Mika
Average: 90.00
```

**Test Cases**
```
# T1
IN:
Mika
90 85 95
OUT:
Student: Mika
Average: 90.00
# T2
IN:
Leo
70 70 70
OUT:
Student: Leo
Average: 70.00
# T3
IN:
Ana
100 99 98
OUT:
Student: Ana
Average: 99.00
# T4
IN:
Noah
0 50 100
OUT:
Student: Noah
Average: 50.00
# T5
IN:
Kai
81 82 83
OUT:
Student: Kai
Average: 82.00
```
**Concepts Practiced:** Class definition, object creation, fields, methods, average calculation, formatted output.

## 22.2 B2. Rectangle Calculator
**Difficulty:** Easy

**Description:** Create a `Rectangle` class with `width` and `height`. Provide methods to calculate its area and perimeter.

Read width and height, create a rectangle object, and print its area and perimeter.

**Input Format:** One line containing two positive integers: width and height.

**Output Format:** Area: X
Perimeter: Y

**Constraints:**

- `1 ≤ width, height ≤ 10,000`

**Sample Input**
```
5 3
```
**Sample Output**
```
Area: 15
Perimeter: 16
```

**Test Cases**
```
# T1
IN:
5 3
OUT:
Area: 15
Perimeter: 16
# T2
IN:
1 1
OUT:
Area: 1
Perimeter: 4
# T3
IN:
10 2
OUT:
Area: 20
Perimeter: 24
# T4
IN:
7 7
OUT:
Area: 49
Perimeter: 28
# T5
IN:
100 25
OUT:
Area: 2500
Perimeter: 250
```
**Concepts Practiced:** Classes, constructors, object state, instance methods, arithmetic.

## 22.3 B3. Bank Account
**Difficulty:** Easy

**Description:** Create a `BankAccount` class with an account holder name and a balance. It must support deposit and withdrawal operations.

A deposit adds to the balance. A withdrawal is successful only if the withdrawal amount is positive and does not exceed the current balance. If a withdrawal is invalid, the balance remains unchanged.

Read the account holder, initial balance, deposit amount, and withdrawal amount. Perform the operations in that order.

**Input Format:** - First line: account holder name (one word).
- Second line: initial balance.
- Third line: deposit amount.
- Fourth line: withdrawal amount.

**Output Format:** Account: name
Balance: X
Withdrawal: SUCCESS
If the withdrawal fails, print `Withdrawal: FAILED`.

**Constraints:**

- `1 ≤ name length ≤ 30`
- `0 ≤ initial balance ≤ 1,000,000`
- `0 ≤ deposit amount ≤ 1,000,000`
- `0 ≤ withdrawal amount ≤ 1,000,000`

**Sample Input**
```
Rina
1000
500
300
```
**Sample Output**
```
Account: Rina
Balance: 1200
Withdrawal: SUCCESS
```

**Test Cases**
```
# T1
IN:
Rina
1000
500
300
OUT:
Account: Rina
Balance: 1200
Withdrawal: SUCCESS
# T2
IN:
Ben
100
0
100
OUT:
Account: Ben
Balance: 0
Withdrawal: SUCCESS
# T3
IN:
Mia
200
50
300
OUT:
Account: Mia
Balance: 250
Withdrawal: FAILED
# T4
IN:
Eli
0
100
1
OUT:
Account: Eli
Balance: 99
Withdrawal: SUCCESS
# T5
IN:
Tess
500
200
200
OUT:
Account: Tess
Balance: 500
Withdrawal: SUCCESS
```
**Concepts Practiced:** Encapsulation, object state, methods that modify state, validation, conditional logic.

## 22.4 B4. Product Inventory Item
**Difficulty:** Medium

**Description:** Create a `Product` class with a product name, unit price, and stock quantity. It must provide methods to calculate the total inventory value and sell a requested quantity.

A sale succeeds only when the requested quantity is positive and no greater than the available stock. A failed sale does not change the stock.

Read the product name, price, initial stock, and requested sale quantity. Print the sale status, remaining stock, and inventory value after the attempted sale.

**Input Format:** - First line: product name (one word).
- Second line: unit price and initial stock quantity.
- Third line: requested sale quantity.

**Output Format:** Product: name
Sale: SUCCESS
Stock: X
Inventory Value: Y
Use `Sale: FAILED` for an unsuccessful sale.

**Constraints:**

- `1 ≤ name length ≤ 30`
- `0 ≤ unit price ≤ 1,000,000`
- `0 ≤ initial stock ≤ 100,000`
- `0 ≤ requested quantity ≤ 100,000`

**Sample Input**
```
Notebook
50 10
3
```
**Sample Output**
```
Product: Notebook
Sale: SUCCESS
Stock: 7
Inventory Value: 350
```

**Test Cases**
```
# T1
IN:
Notebook
50 10
3
OUT:
Product: Notebook
Sale: SUCCESS
Stock: 7
Inventory Value: 350
# T2
IN:
Pen
10 5
5
OUT:
Product: Pen
Sale: SUCCESS
Stock: 0
Inventory Value: 0
# T3
IN:
Bag
500 2
3
OUT:
Product: Bag
Sale: FAILED
Stock: 2
Inventory Value: 1000
# T4
IN:
Eraser
5 0
1
OUT:
Product: Eraser
Sale: FAILED
Stock: 0
Inventory Value: 0
# T5
IN:
Paper
2 100
0
OUT:
Product: Paper
Sale: FAILED
Stock: 100
Inventory Value: 200
```
**Concepts Practiced:** Classes, encapsulation, state changes, methods, validation, object modeling.

## 22.5 B5. Shape Area Using Inheritance
**Difficulty:** Medium

**Description:** Create a base class `Shape` with an area method. Create two derived classes, `Rectangle` and `Circle`, that provide their own area calculations.

The input specifies which shape to create:
- `R width height` for a rectangle.
- `C radius` for a circle.

Use `3.14` as the value of pi. Print the area with exactly two digits after the decimal point.

**Input Format:** One line:
- `R width height`, or
- `C radius`.

**Output Format:** Area: xx.xx

**Constraints:**

- `1 ≤ width, height, radius ≤ 10,000`

**Sample Input**
```
R 5 3
```
**Sample Output**
```
Area: 15.00
```

**Test Cases**
```
# T1
IN:
R 5 3
OUT:
Area: 15.00
# T2
IN:
C 2
OUT:
Area: 12.56
# T3
IN:
R 1 9
OUT:
Area: 9.00
# T4
IN:
C 10
OUT:
Area: 314.00
# T5
IN:
R 12 12
OUT:
Area: 144.00
```
**Concepts Practiced:** Inheritance, base and derived classes, method overriding, polymorphism, floating-point calculations.

## 22.6 B6. Employee Salary Calculator
**Difficulty:** Medium

**Description:** Create a base class `Employee` with a name and monthly base salary. Create a derived class `FullTimeEmployee` that adds a fixed monthly allowance.

The employee's total monthly salary is the base salary plus the allowance. Use an overridden method to calculate the total salary.

**Input Format:** - First line: employee name (one word).
- Second line: base salary and allowance.

**Output Format:** Employee: name
Total Salary: X

**Constraints:**

- `1 ≤ name length ≤ 30`
- `0 ≤ base salary, allowance ≤ 1,000,000`

**Sample Input**
```
Alex
25000 5000
```
**Sample Output**
```
Employee: Alex
Total Salary: 30000
```

**Test Cases**
```
# T1
IN:
Alex
25000 5000
OUT:
Employee: Alex
Total Salary: 30000
# T2
IN:
Bea
18000 0
OUT:
Employee: Bea
Total Salary: 18000
# T3
IN:
Carlo
0 2500
OUT:
Employee: Carlo
Total Salary: 2500
# T4
IN:
Dana
30000 7500
OUT:
Employee: Dana
Total Salary: 37500
# T5
IN:
Evan
99999 1
OUT:
Employee: Evan
Total Salary: 100000
```
**Concepts Practiced:** Inheritance, constructor chaining, method overriding, encapsulated state.

## 22.7 B7. Payment Method Interface
**Difficulty:** Hard

**Description:** Define a `PaymentMethod` interface with a method that processes a payment amount and returns whether the payment succeeds.

Implement two payment types:
- `CashPayment`: accepts a payment when the amount is positive and does not exceed the available cash.
- `CardPayment`: accepts a payment when the amount is positive and does not exceed the card limit.

Read the payment type, available amount or card limit, and requested payment amount. Create the corresponding payment object and process the payment.

**Input Format:** One line containing:
- payment type (`C` for cash or `D` for card),
- available cash or card limit,
- payment amount.

**Output Format:** Print `Payment: APPROVED` or `Payment: DECLINED`.

**Constraints:**

- `0 ≤ available amount, limit, payment amount ≤ 1,000,000`

**Sample Input**
```
C 500 300
```
**Sample Output**
```
Payment: APPROVED
```

**Test Cases**
```
# T1
IN:
C 500 300
OUT:
Payment: APPROVED
# T2
IN:
C 100 150
OUT:
Payment: DECLINED
# T3
IN:
D 1000 1000
OUT:
Payment: APPROVED
# T4
IN:
D 1000 0
OUT:
Payment: DECLINED
# T5
IN:
C 0 1
OUT:
Payment: DECLINED
```
**Concepts Practiced:** Interfaces, interface implementation, polymorphism, object behavior, validation.

## 22.8 B8. Library Book Borrowing
**Difficulty:** Hard

**Description:** Create a `Book` class with a title, author, and availability status. A newly created book is available.

Implement methods to borrow and return the book:
- Borrowing an available book succeeds and makes it unavailable.
- Borrowing an unavailable book fails.
- Returning a borrowed book succeeds and makes it available.
- Returning an already available book fails.

Read the book title, author, and a sequence of operation commands. Process every command in order.

**Input Format:** - First line: title (one word).
- Second line: author (one word).
- Third line: integer `Q`, the number of operations.
- Next `Q` lines: either `BORROW` or `RETURN`.

**Output Format:** Print the title and author, followed by one result per operation:
Book: title
Author: author
BORROW: SUCCESS
RETURN: FAILED
Status: AVAILABLE
The final status is `AVAILABLE` or `BORROWED`.

**Constraints:**

- `1 ≤ title length, author length ≤ 30`
- `1 ≤ Q ≤ 100`
- Commands are exactly `BORROW` or `RETURN`.

**Sample Input**
```
Dune
Herbert
4
BORROW
BORROW
RETURN
RETURN
```
**Sample Output**
```
Book: Dune
Author: Herbert
BORROW: SUCCESS
BORROW: FAILED
RETURN: SUCCESS
RETURN: FAILED
Status: AVAILABLE
```

**Test Cases**
```
# T1
IN:
Dune
Herbert
4
BORROW
BORROW
RETURN
RETURN
OUT:
Book: Dune
Author: Herbert
BORROW: SUCCESS
BORROW: FAILED
RETURN: SUCCESS
RETURN: FAILED
Status: AVAILABLE
# T2
IN:
CleanCode
Martin
1
BORROW
OUT:
Book: CleanCode
Author: Martin
BORROW: SUCCESS
Status: BORROWED
# T3
IN:
Algorithms
Cormen
3
RETURN
BORROW
RETURN
OUT:
Book: Algorithms
Author: Cormen
RETURN: FAILED
BORROW: SUCCESS
RETURN: SUCCESS
Status: AVAILABLE
# T4
IN:
Patterns
Gamma
5
BORROW
RETURN
BORROW
RETURN
BORROW
OUT:
Book: Patterns
Author: Gamma
BORROW: SUCCESS
RETURN: SUCCESS
BORROW: SUCCESS
RETURN: SUCCESS
BORROW: SUCCESS
Status: BORROWED
# T5
IN:
Basics
Ada
2
BORROW
BORROW
OUT:
Book: Basics
Author: Ada
BORROW: SUCCESS
BORROW: FAILED
Status: BORROWED
```
**Concepts Practiced:** Classes, encapsulation, object state, methods, repeated operations, state transitions.

## 22.9 B9. Shopping Cart
**Difficulty:** Hard

**Description:** Create a `CartItem` class with a product name, unit price, and quantity. It must provide a method to calculate the item's subtotal.

Create a `ShoppingCart` class that stores cart items and can calculate the total cost of all items. Read a list of items, create objects, add them to the cart, and print each subtotal followed by the cart total.

**Input Format:** - First line: integer `N`, the number of cart items.
- Next `N` lines: product name, unit price, and quantity.

**Output Format:** For each item, print `name: subtotal`. Then print `Total: amount`.

**Constraints:**

- `1 ≤ N ≤ 100`
- `1 ≤ product name length ≤ 30`
- `0 ≤ unit price ≤ 1,000,000`
- `0 ≤ quantity ≤ 1,000`

**Sample Input**
```
3
Pen 10 2
Notebook 50 3
Bag 500 1
```
**Sample Output**
```
Pen: 20
Notebook: 150
Bag: 500
Total: 670
```

**Test Cases**
```
# T1
IN:
3
Pen 10 2
Notebook 50 3
Bag 500 1
OUT:
Pen: 20
Notebook: 150
Bag: 500
Total: 670
# T2
IN:
1
Pencil 5 4
OUT:
Pencil: 20
Total: 20
# T3
IN:
2
Cable 100 0
Mouse 250 2
OUT:
Cable: 0
Mouse: 500
Total: 500
# T4
IN:
3
A 1 1
B 2 2
C 3 3
OUT:
A: 1
B: 4
C: 9
Total: 14
# T5
IN:
2
Monitor 5000 2
Keyboard 1500 1
OUT:
Monitor: 10000
Keyboard: 1500
Total: 11500
```
**Concepts Practiced:** Multiple classes, object composition, collections, instance methods, aggregation.

## 22.10 B10. Course Enrollment System
**Difficulty:** Hard

**Description:** Create a `Student` class and a `Course` class.

A student has a name and can enroll in courses. A course has a course code, course title, and maximum capacity. The course tracks its current enrollment count.

An enrollment succeeds only if:
- The course has available capacity.
- The student is not already enrolled in that course.

For this exercise, each student is processed independently and the input contains one student and one course. Read a sequence of enrollment attempts for that student and course. Print the result of every attempt and the final enrollment count.

**Input Format:** - First line: student name (one word).
- Second line: course code and course title (one word each).
- Third line: maximum course capacity.
- Fourth line: integer `Q`, the number of enrollment attempts.
- Next `Q` lines: `ENROLL`.

**Output Format:** Student: name
Course: code title
ENROLL: SUCCESS
ENROLL: FAILED
Enrolled: X/Y

**Constraints:**

- `1 ≤ name, code, title length ≤ 30`
- `1 ≤ capacity ≤ 100`
- `1 ≤ Q ≤ 100`
- The same student attempts to enroll repeatedly in the same course.

**Sample Input**
```
Mika
CS101 Programming
2
3
ENROLL
ENROLL
ENROLL
```
**Sample Output**
```
Student: Mika
Course: CS101 Programming
ENROLL: SUCCESS
ENROLL: FAILED
ENROLL: FAILED
Enrolled: 1/2
```

**Test Cases**
```
# T1
IN:
Mika
CS101 Programming
2
3
ENROLL
ENROLL
ENROLL
OUT:
Student: Mika
Course: CS101 Programming
ENROLL: SUCCESS
ENROLL: FAILED
ENROLL: FAILED
Enrolled: 1/2
# T2
IN:
Leo
IT102 Networks
1
1
ENROLL
OUT:
Student: Leo
Course: IT102 Networks
ENROLL: SUCCESS
Enrolled: 1/1
# T3
IN:
Ana
CS201 DataStructures
5
2
ENROLL
ENROLL
OUT:
Student: Ana
Course: CS201 DataStructures
ENROLL: SUCCESS
ENROLL: FAILED
Enrolled: 1/5
# T4
IN:
Noah
IT110 Database
3
1
ENROLL
OUT:
Student: Noah
Course: IT110 Database
ENROLL: SUCCESS
Enrolled: 1/3
# T5
IN:
Kai
CS305 ArtificialIntelligence
1
2
ENROLL
ENROLL
OUT:
Student: Kai
Course: CS305 ArtificialIntelligence
ENROLL: SUCCESS
ENROLL: FAILED
Enrolled: 1/1
```
**Concepts Practiced:** Multiple classes, object relationships, encapsulation, state validation, collections or enrollment tracking.
