using Wherehouse_backend.Models;

namespace Wherehouse_backend.Repository
{
    public interface WherehouseRep
    {
        Task<IEnumerable<Alkalmazott>> GetAlkalmazottak();
        Task<Alkalmazott> GetAlkalmazott(int AlkalmazottId);
        Task<IEnumerable<object>> GetAlkalmazottName(string name);
        Task<Alkalmazott> AddAlkalmazott(Alkalmazott alkalmazott);
        Task<Alkalmazott> UpdateAlkalmazott(Alkalmazott alkalmazott);
        Task<Alkalmazott> DeleteAlkalmazott(int AlkalmazottId);

        Task<IEnumerable<Raktar>> GetRaktarak();
        Task<Raktar> GetRaktar(int RaktarId);
        Task<IEnumerable<object>> GetRaktarAddress(string cim);
        Task<Raktar> AddRaktar(Raktar raktar);
        Task<Raktar> UpdateRaktar(Raktar raktar);
        //Task<Raktar> ElvittekRaktar(int raktarId,bool elvittek);
        Task<Raktar> DeleteRaktar(int RaktarId);

        Task<IEnumerable<Birtokolt>> GetBirtokoltak();
        Task<Birtokolt> GetBirtokolt(int birtokoltId);
        Task<Birtokolt> AddBirtokolt(int raktarId, int tulajId);
        Task<Birtokolt> UpdateBirtokolt(int id, int raktarId, int tulajId);
        Task<Birtokolt> DeleteBirtokolt(int BirtokoltId);
        //én raktam bele
        Task<Birtokolt> DeleteBirtokoltByRaktarId(int raktarId);
        //2023.04.12
        Task<List<Birtokolt>> DeleteBirtokoltByTulajId(int tulajId);


        Task<IEnumerable<Tulajdonos>> GetTulajdonosok();
        Task<Tulajdonos> GetTulajdonos(int TulajdonosId);
        Task<IEnumerable<object>> GetTulajdonosName(string name);
        Task<Tulajdonos> AddTulajdonos(Tulajdonos tulaj);
        Task<Tulajdonos> UpdateTulajdonos(Tulajdonos tulaj);
        Task<Tulajdonos> DeleteTulajdonos(int TulajdonosId);

        Task<Tulajdonos> GetTulajdonosByEmailAndPassword(string email, string password);
    }
}
