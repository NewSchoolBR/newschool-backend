import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Constants } from '../../../CommonsModule/constants';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PartV2Service } from '../../service/v2/part-v2.service';
import { CMSPartDTO } from '../../dto/cms-part.dto';

@ApiTags('PartV2')
@ApiBearerAuth()
@Controller(
  `${Constants.API_PREFIX}/${Constants.API_VERSION_2}/${Constants.PART_ENDPOINT}`,
)
export class PartV2Controller {
  constructor(private readonly service: PartV2Service) {}

  @Get('lesson/:lessonId')
  public async getAll(
    @Param('lessonId', ParseIntPipe) lessonId: number,
  ): Promise<CMSPartDTO[]> {
    return this.service.getAll(lessonId);
  }

  @Get(':id')
  public async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CMSPartDTO> {
    return this.service.findById(id);
  }
}
