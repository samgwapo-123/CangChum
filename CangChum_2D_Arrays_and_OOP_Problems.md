# CangChum Practice Bank: 2D Arrays and Object-Oriented Programming

**Scope:** 2 topic groups, 20 problems, 100 official test cases  
**Language:** Cangjie  
**Recommended placement:** After the existing Lessons 1–20, as two new topic modules or lessons, depending on the current CangChum curriculum structure.  
**Important:** These are problem specifications, not reference solutions. Validate every Cangjie API, syntax requirement, sample, and expected output with the actual Cangjie 1.0.5 compiler before publishing.

## General requirements

- Read input from standard input and write results to standard output.
- Unless stated otherwise, array indices are zero-based.
- Follow the exact output format shown in each problem.
- Do not print prompts such as `Enter size:` in judged solutions.
- Integer averages use truncation toward zero unless a problem explicitly requests a decimal.
- For OOP problems, implement the required classes/structs and methods. The judge should test observable behavior through the program's input/output.
- Do not depend on HashMap or HashSet iteration order.
- Each problem has five test cases. The sample is also represented as Test Case 1.

---

# Topic A — 2D Arrays

## A1. Matrix Sum

**Difficulty:** Easy

### Description
Read an integer `N`, followed by an `N × N` matrix. Calculate the sum of all elements in the matrix.

### Input Format
- First line: integer `N`.
- Next `N` lines: `N` space-separated integers per line.

### Output Format
Print `Sum: X`, where `X` is the sum of all matrix elements.

### Constraints
- `1 ≤ N ≤ 100`
- `-10,000 ≤ element ≤ 10,000`

### Sample Input
```text
3
1 2 3
4 5 6
7 8 9
```

### Sample Output
```text
Sum: 45
```

### Test Cases

**Test Case 1**
```text
3
1 2 3
4 5 6
7 8 9
```
Expected:
```text
Sum: 45
```

**Test Case 2**
```text
1
-7
```
Expected:
```text
Sum: -7
```

**Test Case 3**
```text
2
-1 5
3 -2
```
Expected:
```text
Sum: 5
```

**Test Case 4**
```text
2
0 0
0 0
```
Expected:
```text
Sum: 0
```

**Test Case 5**
```text
3
10000 -10000 1
-5 5 9
2 3 -4
```
Expected:
```text
Sum: 11
```

### Concepts Practiced
2D array initialization, nested loops, accumulation, reading matrix rows.

---

## A2. Sum of Each Row

**Difficulty:** Easy

### Description
Read an `R × C` matrix. Calculate the sum of each row and print the result in row order.

### Input Format
- First line: `R C`.
- Next `R` lines: `C` space-separated integers per line.

### Output Format
For each row `i`, print `Row i: sum`.

### Constraints
- `1 ≤ R, C ≤ 100`
- `-10,000 ≤ element ≤ 10,000`

### Sample Input
```text
3 4
1 2 3 4
5 0 -1 2
7 8 9 1
```

### Sample Output
```text
Row 0: 10
Row 1: 6
Row 2: 25
```

### Test Cases

**Test Case 1**
```text
3 4
1 2 3 4
5 0 -1 2
7 8 9 1
```
Expected:
```text
Row 0: 10
Row 1: 6
Row 2: 25
```

**Test Case 2**
```text
1 3
4 5 6
```
Expected:
```text
Row 0: 15
```

**Test Case 3**
```text
2 2
-3 -2
8 -1
```
Expected:
```text
Row 0: -5
Row 1: 7
```

**Test Case 4**
```text
3 1
9
0
-4
```
Expected:
```text
Row 0: 9
Row 1: 0
Row 2: -4
```

**Test Case 5**
```text
2 3
10000 10000 10000
-10000 -10000 5
```
Expected:
```text
Row 0: 30000
Row 1: -19995
```

### Concepts Practiced
Rectangular 2D arrays, row traversal, nested loops, accumulators.

---

## A3. Sum of Each Column

**Difficulty:** Easy

### Description
Read an `R × C` matrix. Calculate the sum of each column and print the result from the first column to the last.

### Input Format
- First line: `R C`.
- Next `R` lines: `C` space-separated integers per line.

### Output Format
For each column `j`, print `Column j: sum`.

### Constraints
- `1 ≤ R, C ≤ 100`
- `-10,000 ≤ element ≤ 10,000`

### Sample Input
```text
3 3
1 2 3
4 5 6
7 8 9
```

### Sample Output
```text
Column 0: 12
Column 1: 15
Column 2: 18
```

### Test Cases

**Test Case 1**
```text
3 3
1 2 3
4 5 6
7 8 9
```
Expected:
```text
Column 0: 12
Column 1: 15
Column 2: 18
```

**Test Case 2**
```text
1 3
4 5 6
```
Expected:
```text
Column 0: 4
Column 1: 5
Column 2: 6
```

**Test Case 3**
```text
3 1
2
-3
8
```
Expected:
```text
Column 0: 7
```

**Test Case 4**
```text
2 2
-1 -2
-3 -4
```
Expected:
```text
Column 0: -4
Column 1: -6
```

**Test Case 5**
```text
2 4
1 0 2 0
3 4 5 6
```
Expected:
```text
Column 0: 4
Column 1: 4
Column 2: 7
Column 3: 6
```

### Concepts Practiced
Column traversal, fixing the column index while changing the row index, rectangular arrays.

---

## A4. Row and Column Averages

**Difficulty:** Easy

### Description
Read an `R × C` matrix. Print the integer average of each row, followed by the integer average of each column. Integer division truncates toward zero.

### Input Format
- First line: `R C`.
- Next `R` lines: `C` space-separated integers per line.

### Output Format
First print each row average as `Row i Average: value`. Then print each column average as `Column j Average: value`.

### Constraints
- `1 ≤ R, C ≤ 100`
- `-10,000 ≤ element ≤ 10,000`

### Sample Input
```text
2 3
2 4 6
4 6 8
```

### Sample Output
```text
Row 0 Average: 4
Row 1 Average: 6
Column 0 Average: 3
Column 1 Average: 5
Column 2 Average: 7
```

### Test Cases

**Test Case 1**
```text
2 3
2 4 6
4 6 8
```
Expected:
```text
Row 0 Average: 4
Row 1 Average: 6
Column 0 Average: 3
Column 1 Average: 5
Column 2 Average: 7
```

**Test Case 2**
```text
1 1
9
```
Expected:
```text
Row 0 Average: 9
Column 0 Average: 9
```

**Test Case 3**
```text
2 2
1 2
2 3
```
Expected:
```text
Row 0 Average: 1
Row 1 Average: 2
Column 0 Average: 1
Column 1 Average: 2
```

**Test Case 4**
```text
2 3
-2 -4 -6
1 2 3
```
Expected:
```text
Row 0 Average: -4
Row 1 Average: 2
Column 0 Average: 0
Column 1 Average: -1
Column 2 Average: -1
```

**Test Case 5**
```text
3 2
10 20
20 30
30 40
```
Expected:
```text
Row 0 Average: 15
Row 1 Average: 25
Row 2 Average: 35
Column 0 Average: 20
Column 1 Average: 30
```

### Concepts Practiced
Row and column traversal, integer division, accumulators, rectangular matrices.

---

## A5. Main and Secondary Diagonal Sums

**Difficulty:** Easy

### Description
Read an `N × N` square matrix. Calculate the sum of its main diagonal and secondary diagonal.

The main diagonal runs from the top-left to the bottom-right. The secondary diagonal runs from the top-right to the bottom-left. For an odd-sized matrix, the center element belongs to both diagonal sums.

### Input Format
- First line: integer `N`.
- Next `N` lines: `N` space-separated integers per line.

### Output Format
```text
Main Diagonal: X
Secondary Diagonal: Y
```

### Constraints
- `1 ≤ N ≤ 100`
- `-10,000 ≤ element ≤ 10,000`

### Sample Input
```text
3
1 2 3
4 5 6
7 8 9
```

### Sample Output
```text
Main Diagonal: 15
Secondary Diagonal: 15
```

### Test Cases

**Test Case 1**
```text
3
1 2 3
4 5 6
7 8 9
```
Expected:
```text
Main Diagonal: 15
Secondary Diagonal: 15
```

**Test Case 2**
```text
1
8
```
Expected:
```text
Main Diagonal: 8
Secondary Diagonal: 8
```

**Test Case 3**
```text
2
1 2
3 4
```
Expected:
```text
Main Diagonal: 5
Secondary Diagonal: 5
```

**Test Case 4**
```text
3
-1 0 2
4 5 6
7 8 -9
```
Expected:
```text
Main Diagonal: -5
Secondary Diagonal: 14
```

**Test Case 5**
```text
4
1 0 0 2
0 3 4 0
0 5 6 0
7 0 0 8
```
Expected:
```text
Main Diagonal: 18
Secondary Diagonal: 18
```

### Concepts Practiced
Square matrices, diagonal indexing, `arr[i][i]`, `arr[i][N - 1 - i]`.

---

## A6. Find the Largest Element and Its Position

**Difficulty:** Easy

### Description
Read an `R × C` matrix. Find the largest value and print its zero-based row and column position. If the largest value appears more than once, print the position of its first occurrence in row-major order.

### Input Format
- First line: `R C`.
- Next `R` lines: `C` space-separated integers per line.

### Output Format
```text
Maximum: value
Position: [row][column]
```

### Constraints
- `1 ≤ R, C ≤ 100`
- `-1,000,000 ≤ element ≤ 1,000,000`

### Sample Input
```text
2 3
4 9 2
7 9 1
```

### Sample Output
```text
Maximum: 9
Position: [0][1]
```

### Test Cases

**Test Case 1**
```text
2 3
4 9 2
7 9 1
```
Expected:
```text
Maximum: 9
Position: [0][1]
```

**Test Case 2**
```text
1 1
-5
```
Expected:
```text
Maximum: -5
Position: [0][0]
```

**Test Case 3**
```text
2 2
-8 -3
-4 -9
```
Expected:
```text
Maximum: -3
Position: [0][1]
```

**Test Case 4**
```text
3 2
5 5
5 5
5 5
```
Expected:
```text
Maximum: 5
Position: [0][0]
```

**Test Case 5**
```text
3 3
1 2 3
4 15 6
7 8 9
```
Expected:
```text
Maximum: 15
Position: [1][1]
```

### Concepts Practiced
Searching, maximum tracking, row-major traversal, position tracking.

---

## A7. Count Target Occurrences

**Difficulty:** Medium

### Description
Read an `R × C` matrix and a target integer `T`. Count how many times `T` appears in the matrix.

### Input Format
- First line: `R C`.
- Next `R` lines: `C` space-separated integers per line.
- Last line: target integer `T`.

### Output Format
Print `Occurrences: X`.

### Constraints
- `1 ≤ R, C ≤ 100`
- `-10,000 ≤ element, T ≤ 10,000`

### Sample Input
```text
3 3
5 2 5
1 5 3
5 4 2
5
```

### Sample Output
```text
Occurrences: 4
```

### Test Cases

**Test Case 1**
```text
3 3
5 2 5
1 5 3
5 4 2
5
```
Expected:
```text
Occurrences: 4
```

**Test Case 2**
```text
2 2
1 2
3 4
9
```
Expected:
```text
Occurrences: 0
```

**Test Case 3**
```text
1 4
7 7 7 7
7
```
Expected:
```text
Occurrences: 4
```

**Test Case 4**
```text
2 3
-1 0 -1
2 -1 3
-1
```
Expected:
```text
Occurrences: 3
```

**Test Case 5**
```text
3 1
0
1
0
0
```
Expected:
```text
Occurrences: 2
```

### Concepts Practiced
Nested loops, equality comparison, counters, target searching.

---

## A8. Matrix Transpose

**Difficulty:** Medium

### Description
Read an `R × C` matrix and print its transpose. The transpose changes the matrix dimensions to `C × R`; element at original position `[i][j]` appears at transposed position `[j][i]`.

### Input Format
- First line: `R C`.
- Next `R` lines: `C` space-separated integers per line.

### Output Format
Print the transposed matrix, one row per line, with single spaces between values and no trailing spaces.

### Constraints
- `1 ≤ R, C ≤ 100`
- `-10,000 ≤ element ≤ 10,000`

### Sample Input
```text
2 3
1 2 3
4 5 6
```

### Sample Output
```text
1 4
2 5
3 6
```

### Test Cases

**Test Case 1**
```text
2 3
1 2 3
4 5 6
```
Expected:
```text
1 4
2 5
3 6
```

**Test Case 2**
```text
1 3
7 8 9
```
Expected:
```text
7
8
9
```

**Test Case 3**
```text
3 1
2
4
6
```
Expected:
```text
2 4 6
```

**Test Case 4**
```text
2 2
-1 0
5 3
```
Expected:
```text
-1 5
0 3
```

**Test Case 5**
```text
3 2
1 2
3 4
5 6
```
Expected:
```text
1 3 5
2 4 6
```

### Concepts Practiced
Rectangular arrays, swapped indices, output formatting, nested loops.

---

## A9. Matrix Addition

**Difficulty:** Medium

### Description
Read two matrices with the same dimensions `R × C`. Add corresponding elements and print the resulting matrix.

### Input Format
- First line: `R C`.
- Next `R` lines: first matrix.
- Next `R` lines: second matrix.
- Each matrix row contains `C` space-separated integers.

### Output Format
Print the resulting matrix, one row per line, with single spaces between values and no trailing spaces.

### Constraints
- `1 ≤ R, C ≤ 100`
- `-10,000 ≤ element ≤ 10,000`

### Sample Input
```text
2 2
1 2
3 4
5 6
7 8
```

### Sample Output
```text
6 8
10 12
```

### Test Cases

**Test Case 1**
```text
2 2
1 2
3 4
5 6
7 8
```
Expected:
```text
6 8
10 12
```

**Test Case 2**
```text
1 1
-3
8
```
Expected:
```text
5
```

**Test Case 3**
```text
2 3
1 0 -1
2 3 4
-1 5 1
0 -3 6
```
Expected:
```text
0 5 0
2 0 10
```

**Test Case 4**
```text
3 1
1
2
3
4
5
6
```
Expected:
```text
5
7
9
```

**Test Case 5**
```text
1 4
10000 -10000 7 0
-10000 10000 -7 1
```
Expected:
```text
0 0 0 1
```

### Concepts Practiced
Multiple 2D arrays, corresponding element access, matrix arithmetic.

---

## A10. Matrix Multiplication

**Difficulty:** Hard

### Description
Read two matrices, `A` with dimensions `R × K` and `B` with dimensions `K × C`. Calculate their product `P = A × B`.

Each result element is calculated by multiplying a row of `A` by a column of `B` and adding the products.

### Input Format
- First line: `R K C`.
- Next `R` lines: matrix A, each with `K` integers.
- Next `K` lines: matrix B, each with `C` integers.

### Output Format
Print the resulting `R × C` matrix, one row per line, with single spaces between values and no trailing spaces.

### Constraints
- `1 ≤ R, K, C ≤ 30`
- `-100 ≤ element ≤ 100`

### Sample Input
```text
2 3 2
1 2 3
4 5 6
7 8
9 10
11 12
```

### Sample Output
```text
58 64
139 154
```

### Test Cases

**Test Case 1**
```text
2 3 2
1 2 3
4 5 6
7 8
9 10
11 12
```
Expected:
```text
58 64
139 154
```

**Test Case 2**
```text
1 1 1
5
4
```
Expected:
```text
20
```

**Test Case 3**
```text
2 2 2
1 0
0 1
3 4
5 6
```
Expected:
```text
3 4
5 6
```

**Test Case 4**
```text
2 2 3
1 2
3 4
1 2 3
4 5 6
```
Expected:
```text
9 12 15
19 26 33
```

**Test Case 5**
```text
2 2 1
1 -1
2 3
4
-2
```
Expected:
```text
6
2
```

### Concepts Practiced
Three nested loops, compatible matrix dimensions, multiplication and accumulation.

---

# Topic B — Object-Oriented Programming (OOP)

## OOP problem requirements

- Use Cangjie's supported class or struct features as appropriate.
- Each problem explicitly identifies the required object-oriented concept.
- Keep object state and operations inside the required type where appropriate.
- Use standard input/output so the problems can be judged automatically.
- Do not replace the required OOP implementation with unrelated procedural code.
- Validate constructor, access modifier, method, inheritance, overriding, and interface syntax against Cangjie 1.0.5 before publishing.

## B1. Student Record

**Difficulty:** Easy

### Description
Create a `Student` class with a name and three integer grades. The class must provide a method that calculates the student's average grade.

Read the student's name and three grades. Create a `Student` object and display the name and average. The average is printed with exactly two digits after the decimal point.

### Input Format
- First line: student name (one word).
- Second line: three space-separated integer grades.

### Output Format
```text
Student: name
Average: xx.xx
```

### Constraints
- `1 ≤ name length ≤ 30`
- `0 ≤ grade ≤ 100`

### Sample Input
```text
Mika
90 85 95
```

### Sample Output
```text
Student: Mika
Average: 90.00
```

### Test Cases

**Test Case 1**
```text
Mika
90 85 95
```
Expected:
```text
Student: Mika
Average: 90.00
```

**Test Case 2**
```text
Leo
70 70 70
```
Expected:
```text
Student: Leo
Average: 70.00
```

**Test Case 3**
```text
Ana
100 99 98
```
Expected:
```text
Student: Ana
Average: 99.00
```

**Test Case 4**
```text
Noah
0 50 100
```
Expected:
```text
Student: Noah
Average: 50.00
```

**Test Case 5**
```text
Kai
81 82 83
```
Expected:
```text
Student: Kai
Average: 82.00
```

### Concepts Practiced
Class definition, object creation, fields, methods, average calculation, formatted output.

---

## B2. Rectangle Calculator

**Difficulty:** Easy

### Description
Create a `Rectangle` class with `width` and `height`. Provide methods to calculate its area and perimeter.

Read width and height, create a rectangle object, and print its area and perimeter.

### Input Format
One line containing two positive integers: width and height.

### Output Format
```text
Area: X
Perimeter: Y
```

### Constraints
- `1 ≤ width, height ≤ 10,000`

### Sample Input
```text
5 3
```

### Sample Output
```text
Area: 15
Perimeter: 16
```

### Test Cases

**Test Case 1**
```text
5 3
```
Expected:
```text
Area: 15
Perimeter: 16
```

**Test Case 2**
```text
1 1
```
Expected:
```text
Area: 1
Perimeter: 4
```

**Test Case 3**
```text
10 2
```
Expected:
```text
Area: 20
Perimeter: 24
```

**Test Case 4**
```text
7 7
```
Expected:
```text
Area: 49
Perimeter: 28
```

**Test Case 5**
```text
100 25
```
Expected:
```text
Area: 2500
Perimeter: 250
```

### Concepts Practiced
Classes, constructors, object state, instance methods, arithmetic.

---

## B3. Bank Account

**Difficulty:** Easy

### Description
Create a `BankAccount` class with an account holder name and a balance. It must support deposit and withdrawal operations.

A deposit adds to the balance. A withdrawal is successful only if the withdrawal amount is positive and does not exceed the current balance. If a withdrawal is invalid, the balance remains unchanged.

Read the account holder, initial balance, deposit amount, and withdrawal amount. Perform the operations in that order.

### Input Format
- First line: account holder name (one word).
- Second line: initial balance.
- Third line: deposit amount.
- Fourth line: withdrawal amount.

### Output Format
```text
Account: name
Balance: X
Withdrawal: SUCCESS
```
If the withdrawal fails, print `Withdrawal: FAILED`.

### Constraints
- `1 ≤ name length ≤ 30`
- `0 ≤ initial balance ≤ 1,000,000`
- `0 ≤ deposit amount ≤ 1,000,000`
- `0 ≤ withdrawal amount ≤ 1,000,000`

### Sample Input
```text
Rina
1000
500
300
```

### Sample Output
```text
Account: Rina
Balance: 1200
Withdrawal: SUCCESS
```

### Test Cases

**Test Case 1**
```text
Rina
1000
500
300
```
Expected:
```text
Account: Rina
Balance: 1200
Withdrawal: SUCCESS
```

**Test Case 2**
```text
Ben
100
0
100
```
Expected:
```text
Account: Ben
Balance: 0
Withdrawal: SUCCESS
```

**Test Case 3**
```text
Mia
200
50
300
```
Expected:
```text
Account: Mia
Balance: 250
Withdrawal: FAILED
```

**Test Case 4**
```text
Eli
0
100
1
```
Expected:
```text
Account: Eli
Balance: 99
Withdrawal: SUCCESS
```

**Test Case 5**
```text
Tess
500
200
200
```
Expected:
```text
Account: Tess
Balance: 500
Withdrawal: SUCCESS
```

### Concepts Practiced
Encapsulation, object state, methods that modify state, validation, conditional logic.

---

## B4. Product Inventory Item

**Difficulty:** Easy–Medium

### Description
Create a `Product` class with a product name, unit price, and stock quantity. It must provide methods to calculate the total inventory value and sell a requested quantity.

A sale succeeds only when the requested quantity is positive and no greater than the available stock. A failed sale does not change the stock.

Read the product name, price, initial stock, and requested sale quantity. Print the sale status, remaining stock, and inventory value after the attempted sale.

### Input Format
- First line: product name (one word).
- Second line: unit price and initial stock quantity.
- Third line: requested sale quantity.

### Output Format
```text
Product: name
Sale: SUCCESS
Stock: X
Inventory Value: Y
```
Use `Sale: FAILED` for an unsuccessful sale.

### Constraints
- `1 ≤ name length ≤ 30`
- `0 ≤ unit price ≤ 1,000,000`
- `0 ≤ initial stock ≤ 100,000`
- `0 ≤ requested quantity ≤ 100,000`

### Sample Input
```text
Notebook
50 10
3
```

### Sample Output
```text
Product: Notebook
Sale: SUCCESS
Stock: 7
Inventory Value: 350
```

### Test Cases

**Test Case 1**
```text
Notebook
50 10
3
```
Expected:
```text
Product: Notebook
Sale: SUCCESS
Stock: 7
Inventory Value: 350
```

**Test Case 2**
```text
Pen
10 5
5
```
Expected:
```text
Product: Pen
Sale: SUCCESS
Stock: 0
Inventory Value: 0
```

**Test Case 3**
```text
Bag
500 2
3
```
Expected:
```text
Product: Bag
Sale: FAILED
Stock: 2
Inventory Value: 1000
```

**Test Case 4**
```text
Eraser
5 0
1
```
Expected:
```text
Product: Eraser
Sale: FAILED
Stock: 0
Inventory Value: 0
```

**Test Case 5**
```text
Paper
2 100
0
```
Expected:
```text
Product: Paper
Sale: FAILED
Stock: 100
Inventory Value: 200
```

### Concepts Practiced
Classes, encapsulation, state changes, methods, validation, object modeling.

---

## B5. Shape Area Using Inheritance

**Difficulty:** Medium

### Description
Create a base class `Shape` with an area method. Create two derived classes, `Rectangle` and `Circle`, that provide their own area calculations.

The input specifies which shape to create:
- `R width height` for a rectangle.
- `C radius` for a circle.

Use `3.14` as the value of pi. Print the area with exactly two digits after the decimal point.

### Input Format
One line:
- `R width height`, or
- `C radius`.

### Output Format
```text
Area: xx.xx
```

### Constraints
- `1 ≤ width, height, radius ≤ 10,000`

### Sample Input
```text
R 5 3
```

### Sample Output
```text
Area: 15.00
```

### Test Cases

**Test Case 1**
```text
R 5 3
```
Expected:
```text
Area: 15.00
```

**Test Case 2**
```text
C 2
```
Expected:
```text
Area: 12.56
```

**Test Case 3**
```text
R 1 9
```
Expected:
```text
Area: 9.00
```

**Test Case 4**
```text
C 10
```
Expected:
```text
Area: 314.00
```

**Test Case 5**
```text
R 12 12
```
Expected:
```text
Area: 144.00
```

### Concepts Practiced
Inheritance, base and derived classes, method overriding, polymorphism, floating-point calculations.

---

## B6. Employee Salary Calculator

**Difficulty:** Medium

### Description
Create a base class `Employee` with a name and monthly base salary. Create a derived class `FullTimeEmployee` that adds a fixed monthly allowance.

The employee's total monthly salary is the base salary plus the allowance. Use an overridden method to calculate the total salary.

### Input Format
- First line: employee name (one word).
- Second line: base salary and allowance.

### Output Format
```text
Employee: name
Total Salary: X
```

### Constraints
- `1 ≤ name length ≤ 30`
- `0 ≤ base salary, allowance ≤ 1,000,000`

### Sample Input
```text
Alex
25000 5000
```

### Sample Output
```text
Employee: Alex
Total Salary: 30000
```

### Test Cases

**Test Case 1**
```text
Alex
25000 5000
```
Expected:
```text
Employee: Alex
Total Salary: 30000
```

**Test Case 2**
```text
Bea
18000 0
```
Expected:
```text
Employee: Bea
Total Salary: 18000
```

**Test Case 3**
```text
Carlo
0 2500
```
Expected:
```text
Employee: Carlo
Total Salary: 2500
```

**Test Case 4**
```text
Dana
30000 7500
```
Expected:
```text
Employee: Dana
Total Salary: 37500
```

**Test Case 5**
```text
Evan
99999 1
```
Expected:
```text
Employee: Evan
Total Salary: 100000
```

### Concepts Practiced
Inheritance, constructor chaining, method overriding, encapsulated state.

---

## B7. Payment Method Interface

**Difficulty:** Medium–Hard

### Description
Define a `PaymentMethod` interface with a method that processes a payment amount and returns whether the payment succeeds.

Implement two payment types:
- `CashPayment`: accepts a payment when the amount is positive and does not exceed the available cash.
- `CardPayment`: accepts a payment when the amount is positive and does not exceed the card limit.

Read the payment type, available amount or card limit, and requested payment amount. Create the corresponding payment object and process the payment.

### Input Format
One line containing:
- payment type (`C` for cash or `D` for card),
- available cash or card limit,
- payment amount.

### Output Format
Print `Payment: APPROVED` or `Payment: DECLINED`.

### Constraints
- `0 ≤ available amount, limit, payment amount ≤ 1,000,000`

### Sample Input
```text
C 500 300
```

### Sample Output
```text
Payment: APPROVED
```

### Test Cases

**Test Case 1**
```text
C 500 300
```
Expected:
```text
Payment: APPROVED
```

**Test Case 2**
```text
C 100 150
```
Expected:
```text
Payment: DECLINED
```

**Test Case 3**
```text
D 1000 1000
```
Expected:
```text
Payment: APPROVED
```

**Test Case 4**
```text
D 1000 0
```
Expected:
```text
Payment: DECLINED
```

**Test Case 5**
```text
C 0 1
```
Expected:
```text
Payment: DECLINED
```

### Concepts Practiced
Interfaces, interface implementation, polymorphism, object behavior, validation.

---

## B8. Library Book Borrowing

**Difficulty:** Medium–Hard

### Description
Create a `Book` class with a title, author, and availability status. A newly created book is available.

Implement methods to borrow and return the book:
- Borrowing an available book succeeds and makes it unavailable.
- Borrowing an unavailable book fails.
- Returning a borrowed book succeeds and makes it available.
- Returning an already available book fails.

Read the book title, author, and a sequence of operation commands. Process every command in order.

### Input Format
- First line: title (one word).
- Second line: author (one word).
- Third line: integer `Q`, the number of operations.
- Next `Q` lines: either `BORROW` or `RETURN`.

### Output Format
Print the title and author, followed by one result per operation:
```text
Book: title
Author: author
BORROW: SUCCESS
RETURN: FAILED
Status: AVAILABLE
```
The final status is `AVAILABLE` or `BORROWED`.

### Constraints
- `1 ≤ title length, author length ≤ 30`
- `1 ≤ Q ≤ 100`
- Commands are exactly `BORROW` or `RETURN`.

### Sample Input
```text
Dune
Herbert
4
BORROW
BORROW
RETURN
RETURN
```

### Sample Output
```text
Book: Dune
Author: Herbert
BORROW: SUCCESS
BORROW: FAILED
RETURN: SUCCESS
RETURN: FAILED
Status: AVAILABLE
```

### Test Cases

**Test Case 1**
```text
Dune
Herbert
4
BORROW
BORROW
RETURN
RETURN
```
Expected:
```text
Book: Dune
Author: Herbert
BORROW: SUCCESS
BORROW: FAILED
RETURN: SUCCESS
RETURN: FAILED
Status: AVAILABLE
```

**Test Case 2**
```text
CleanCode
Martin
1
BORROW
```
Expected:
```text
Book: CleanCode
Author: Martin
BORROW: SUCCESS
Status: BORROWED
```

**Test Case 3**
```text
Algorithms
Cormen
3
RETURN
BORROW
RETURN
```
Expected:
```text
Book: Algorithms
Author: Cormen
RETURN: FAILED
BORROW: SUCCESS
RETURN: SUCCESS
Status: AVAILABLE
```

**Test Case 4**
```text
Patterns
Gamma
5
BORROW
RETURN
BORROW
RETURN
BORROW
```
Expected:
```text
Book: Patterns
Author: Gamma
BORROW: SUCCESS
RETURN: SUCCESS
BORROW: SUCCESS
RETURN: SUCCESS
BORROW: SUCCESS
Status: BORROWED
```

**Test Case 5**
```text
Basics
Ada
2
BORROW
BORROW
```
Expected:
```text
Book: Basics
Author: Ada
BORROW: SUCCESS
BORROW: FAILED
Status: BORROWED
```

### Concepts Practiced
Classes, encapsulation, object state, methods, repeated operations, state transitions.

---

## B9. Shopping Cart

**Difficulty:** Hard

### Description
Create a `CartItem` class with a product name, unit price, and quantity. It must provide a method to calculate the item's subtotal.

Create a `ShoppingCart` class that stores cart items and can calculate the total cost of all items. Read a list of items, create objects, add them to the cart, and print each subtotal followed by the cart total.

### Input Format
- First line: integer `N`, the number of cart items.
- Next `N` lines: product name, unit price, and quantity.

### Output Format
For each item, print `name: subtotal`. Then print `Total: amount`.

### Constraints
- `1 ≤ N ≤ 100`
- `1 ≤ product name length ≤ 30`
- `0 ≤ unit price ≤ 1,000,000`
- `0 ≤ quantity ≤ 1,000`

### Sample Input
```text
3
Pen 10 2
Notebook 50 3
Bag 500 1
```

### Sample Output
```text
Pen: 20
Notebook: 150
Bag: 500
Total: 670
```

### Test Cases

**Test Case 1**
```text
3
Pen 10 2
Notebook 50 3
Bag 500 1
```
Expected:
```text
Pen: 20
Notebook: 150
Bag: 500
Total: 670
```

**Test Case 2**
```text
1
Pencil 5 4
```
Expected:
```text
Pencil: 20
Total: 20
```

**Test Case 3**
```text
2
Cable 100 0
Mouse 250 2
```
Expected:
```text
Cable: 0
Mouse: 500
Total: 500
```

**Test Case 4**
```text
3
A 1 1
B 2 2
C 3 3
```
Expected:
```text
A: 1
B: 4
C: 9
Total: 14
```

**Test Case 5**
```text
2
Monitor 5000 2
Keyboard 1500 1
```
Expected:
```text
Monitor: 10000
Keyboard: 1500
Total: 11500
```

### Concepts Practiced
Multiple classes, object composition, collections, instance methods, aggregation.

---

## B10. Course Enrollment System

**Difficulty:** Hard

### Description
Create a `Student` class and a `Course` class.

A student has a name and can enroll in courses. A course has a course code, course title, and maximum capacity. The course tracks its current enrollment count.

An enrollment succeeds only if:
- The course has available capacity.
- The student is not already enrolled in that course.

For this exercise, each student is processed independently and the input contains one student and one course. Read a sequence of enrollment attempts for that student and course. Print the result of every attempt and the final enrollment count.

### Input Format
- First line: student name (one word).
- Second line: course code and course title (one word each).
- Third line: maximum course capacity.
- Fourth line: integer `Q`, the number of enrollment attempts.
- Next `Q` lines: `ENROLL`.

### Output Format
```text
Student: name
Course: code title
ENROLL: SUCCESS
ENROLL: FAILED
Enrolled: X/Y
```

### Constraints
- `1 ≤ name, code, title length ≤ 30`
- `1 ≤ capacity ≤ 100`
- `1 ≤ Q ≤ 100`
- The same student attempts to enroll repeatedly in the same course.

### Sample Input
```text
Mika
CS101 Programming
2
3
ENROLL
ENROLL
ENROLL
```

### Sample Output
```text
Student: Mika
Course: CS101 Programming
ENROLL: SUCCESS
ENROLL: FAILED
ENROLL: FAILED
Enrolled: 1/2
```

### Test Cases

**Test Case 1**
```text
Mika
CS101 Programming
2
3
ENROLL
ENROLL
ENROLL
```
Expected:
```text
Student: Mika
Course: CS101 Programming
ENROLL: SUCCESS
ENROLL: FAILED
ENROLL: FAILED
Enrolled: 1/2
```

**Test Case 2**
```text
Leo
IT102 Networks
1
1
ENROLL
```
Expected:
```text
Student: Leo
Course: IT102 Networks
ENROLL: SUCCESS
Enrolled: 1/1
```

**Test Case 3**
```text
Ana
CS201 DataStructures
5
2
ENROLL
ENROLL
```
Expected:
```text
Student: Ana
Course: CS201 DataStructures
ENROLL: SUCCESS
ENROLL: FAILED
Enrolled: 1/5
```

**Test Case 4**
```text
Noah
IT110 Database
3
1
ENROLL
```
Expected:
```text
Student: Noah
Course: IT110 Database
ENROLL: SUCCESS
Enrolled: 1/3
```

**Test Case 5**
```text
Kai
CS305 ArtificialIntelligence
1
2
ENROLL
ENROLL
```
Expected:
```text
Student: Kai
Course: CS305 ArtificialIntelligence
ENROLL: SUCCESS
ENROLL: FAILED
Enrolled: 1/1
```

### Concepts Practiced
Multiple classes, object relationships, encapsulation, state validation, collections or enrollment tracking.

---

# Suggested Learning Order

| Order | Problem | Main skill |
|---:|---|---|
| 1 | A1 Matrix Sum | Basic nested loops |
| 2 | A2 Sum of Each Row | Row traversal |
| 3 | A3 Sum of Each Column | Column traversal |
| 4 | A4 Row and Column Averages | Average calculations |
| 5 | A5 Diagonal Sums | Diagonal indexing |
| 6 | A6 Largest Element | Searching and tracking |
| 7 | A7 Target Occurrences | Counting |
| 8 | A8 Matrix Transpose | Swapped indices |
| 9 | A9 Matrix Addition | Multiple matrices |
| 10 | A10 Matrix Multiplication | Three nested loops |
| 11 | B1 Student Record | Class and object |
| 12 | B2 Rectangle Calculator | Fields and methods |
| 13 | B3 Bank Account | Encapsulation |
| 14 | B4 Product Inventory | State changes |
| 15 | B5 Shape Area | Inheritance and overriding |
| 16 | B6 Employee Salary | Inheritance |
| 17 | B7 Payment Method | Interfaces and polymorphism |
| 18 | B8 Library Book | Object state |
| 19 | B9 Shopping Cart | Object composition |
| 20 | B10 Course Enrollment | Multiple objects and relationships |

# Validation Notes for CangChum Integration

This Markdown file is a proposed problem bank. Before importing it into the official curriculum:

1. Independently recalculate every expected output.
2. Compile Cangjie reference solutions using the actual Cangjie 1.0.5 environment.
3. Validate class, constructor, inheritance, overriding, interface, and collection syntax.
4. Pay special attention to two-decimal formatting in B1 and B5. Do not assume a formatting API without checking it against the installed compiler.
5. Ensure B7's interface design and B9's collection usage are expressible in the installed Cangjie version.
6. Ensure every problem's sample output exactly matches its test case output.
7. Keep the problem statements and expected outputs unchanged unless a demonstrated error is found.
8. Report ambiguous requirements rather than silently inventing behavior.
