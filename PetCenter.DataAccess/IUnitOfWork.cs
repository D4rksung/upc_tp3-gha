using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PetCenter.DataAccess
{
    public interface IUnitOfWork
    {
        void Dispose();

        void SaveChanges();
    }
}
