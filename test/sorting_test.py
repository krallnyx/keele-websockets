import unittest
import sorting

test_array = [ 5, 5, 7, 8, 2, 4, 1 ]
result_array = [ 1, 2, 4, 5, 5, 7, 8 ]
empty_array = []
str_float_mixed_array = [ '7', 'foo', 0.7, '23', 'bar' ]
str_int_mixed_array = [ '4', '2' , 'foo', 'bar' ]
str_int_mixed_array_result = [ '2', '4' , 'bar', 'foo' ]


class TestSorting(unittest.TestCase):


    def test_bubble_sort_with_positive_numbers(self):
        """Pass if method sorts correctly"""
        self.assertEqual(sorting.bubble_sort(test_array), result_array)

    
    def test_bubble_sort_with_empty_list(self):
        """Pass if method returns empty array"""
        self.assertEqual(sorting.bubble_sort(empty_array), empty_array)


    def test_bubble_sort_with_str_and_int(self):
        """Can mix strings and ints"""
        self.assertEqual(sorting.bubble_sort(str_int_mixed_array), str_int_mixed_array_result)


    def test_bubble_sort_with_mixed_array(self):
        """Pass if we get a TypeError when passed an array containing non-integers"""
        with self.assertRaises(TypeError):
            sorting.bubble_sort(str_float_mixed_array)


if __name__ == '__main__':
    unittest.main(verbosity=2)