using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
   public static class ExtentionMethods
    {
        public static bool CompareWithArray(this string str, string[] arr)
        {
            //splits str where there are spaces
            string[] arr2 = str.Split(' ');
            //returns false if any element of arr2 is not included in arr, otherwise returns true
            return !arr2.Except(arr).Any();
           
        }
    }
}
