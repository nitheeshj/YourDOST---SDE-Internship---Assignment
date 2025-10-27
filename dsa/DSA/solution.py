"""
Problem:
Given an array of integers, return the second largest unique number in the array.
If it doesn't exist, return -1.

Example:

Input: [3, 5, 2, 5, 6, 6, 1]
Output: 5

Input: [7, 7, 7]
Output: -1

"""

def Second_Largest(arr):
    
    n = len(arr)
    
    #initialization of first and secondlargest
    first = arr[0]
    second = float('-inf')
    
    #if the array has only one element
    if n < 2:
        return -1
    
    
    for i in range(1,n):
        
        #if we find the largest
        if arr[i] > first:
            second = first
            first = arr[i]
        
        #for the second largest    
        elif arr[i] < first and arr[i] > second:
            second = arr[i]
            
    
    #if still we didn't find the second largest unique element        
    if second == float('-inf'):
        return - 1
    
    return second


# --------------------------
# Sample Test Cases
# --------------------------

test_cases = [
    [3, 5, 2, 5, 6, 6, 1],  # expected: 5
    [7, 7, 7],              # expected: -1
    [10, 9, 8, 11],         # expected: 10
    [1],                    # expected: -1
    [2, 2, 3, 3, 4, 4]      # expected: 3
]

for arr in test_cases:
    print(f"Input: {arr} -> Output: {Second_Largest(arr)}")

