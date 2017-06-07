using System;

namespace PetCenter.Web.Models
{
    public class DTOBase
    {
        #region Paginacion
        private Int32 _PageSize;
        public Int32 PageSize
        {
            get { return _PageSize; }
            set { _PageSize = value; }
        }

        private Int32 _CurrentPage;
        public Int32 CurrentPage
        {
            get { return _CurrentPage; }
            set { _CurrentPage = value; }
        }

        private String _SortColumn;
        public String SortColumn
        {
            get { return _SortColumn; }
            set { _SortColumn = value; }
        }

        private String _SortOrder;
        public String SortOrder
        {
            get { return _SortOrder; }
            set { _SortOrder = value; }
        }
        #endregion
    }
}