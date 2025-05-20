using Microsoft.AspNetCore.Mvc;
using Server.Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScoresController : ControllerBase
    {
        private static readonly List<Score> Scores = new();

        [HttpPost]
        public IActionResult PostScore([FromBody] Score score)
        {
            Scores.Add(score);
            return Ok(new { message = "Score recorded", score });
        }

        [HttpGet]
        public IActionResult GetScores()
        {
            return Ok(Scores.OrderByDescending(s => s.Points));
        }
    }
}
