using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections;
using System.Reflection;

namespace PetCenter.Web.Clases
{
    public class JsonResponse
    {
        private Int32 _pageCount;
        private Int32 _currentPage;
        private Int32 _recordCount;
        private Object _items;

        public Int32 PageCount
        {
            get { return _pageCount; }
            set { _pageCount = value; }
        }

        public Int32 CurrentPage
        {
            get { return _currentPage; }
            set { _currentPage = value; }
        }

        public Int32 RecordCount
        {
            get { return _recordCount; }
            set { _recordCount = value; }
        }

        public Object Items
        {
            get { return _items; }
            set { _items = value; }
        }

        public JsonResponse()
        {
            _items = new List<Hashtable>();
        }

        public JsonResponse Serialization<T>(int pPageCount, int pCurrentPage, int pRecordCount, IList<T> oList)
        {
            JsonResponse oJsonResponse = new JsonResponse();

            oJsonResponse._pageCount = pPageCount;
            oJsonResponse._currentPage = pCurrentPage;
            oJsonResponse._recordCount = pRecordCount;
            oJsonResponse._items = oList;

            return oJsonResponse;
        }

        public JsonResponse Serialization<T>(IList<T> oList)
        {
            JsonResponse oJsonResponse = new JsonResponse();

            oJsonResponse._items = oList;

            return oJsonResponse;
        }
    }
}